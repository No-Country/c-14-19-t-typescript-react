import { compare, hash } from "bcryptjs";
import NotFoundException from "../../../exception/NotFoundException";
import AuthorizationManager from "../../../utils/AuthotizationManager";
import homebankingModelInterface from "../interface/homebankingModel.interface";
import HomebankingModel from "../model/homebanking.model";
import BadRequestException from "../../../exception/BadRequestException";
import UserModel from "../../user/model/user.model";

export default class UpdatePasswordHBUC {
  async run(
    id: string,
    password: string,
    idJwt: string
  ): Promise<{ msg: string }> {
    //get hb account:
    const hb = await this.getHBAccount(id);

    //check authorization:
    AuthorizationManager.checkIdentity(hb.user.id, idJwt);

    //compare passwords:
    await this.comparePassword(password, hb.password);

    //hash:
    const hashPass = await hash(password, 8);

    const affectedRow: number[] = await HomebankingModel.update(
      { password: hashPass },
      { where: { id } }
    );

    if (affectedRow[0] === 0)
      return { msg: "No se puedo actualizar la contraseña" };
    return { msg: "Contraseña actualizada" };
  }

  private async getHBAccount(id: string): Promise<homebankingModelInterface> {
    const hb = await HomebankingModel.findOne({
      where: { id },
      include: [{ model: UserModel }],
    });
    if (!hb) throw new NotFoundException("Usuario no encontrado");
    return hb;
  }

  private async comparePassword(pass: string, hash: string): Promise<void> {
    const c = await compare(pass, hash);
    if (c)
      throw new BadRequestException(
        "La nueva contraseña no puede ser igual que la actual"
      );
  }
}
