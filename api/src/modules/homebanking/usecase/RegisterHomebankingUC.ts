import BadRequestException from "../../../exception/BadRequestException";
import NotFoundException from "../../../exception/NotFoundException";
import { userModelInterface } from "../../user/interface/userModel.interface";
import UserModel from "../../user/model/user.model";
import homebankingCreateInterface from "../interface/homebankingCreate.interface";
import HomebankingModel from "../model/homebanking.model";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

export default class RegisterHomebankingUC {
  async run(data: homebankingCreateInterface): Promise<{ msg: string }> {
    //check user:
    const user = await this.checkRC(data.reference_code);

    //check homebanking account:
    await this.checkHomebankingAccount(user.id);

    //check username:
    await this.checkUsername(data.username);

    const id = uuid();
    const hashPass = await hash(data.password, 8);

    await HomebankingModel.create({
      id,
      username: data.username,
      password: hashPass,
      id_user: user.id,
    });

    return { msg: "Registro exitoso" };
  }

  private async checkRC(reference_code: string): Promise<userModelInterface> {
    const user = await UserModel.findOne({ where: { reference_code } });
    if (!user) throw new NotFoundException("Usuario no encontrado");

    return user;
  }

  private async checkHomebankingAccount(id_user: string): Promise<void> {
    const homebankingAccount = await HomebankingModel.findOne({
      where: { id_user },
    });
    if (homebankingAccount)
      throw new BadRequestException(
        "Usuario ya tiene una cuenta de homebanking"
      );
  }

  private async checkUsername(username: string): Promise<void> {
    const homebankingAccount = await HomebankingModel.findOne({
      where: { username },
    });
    if (homebankingAccount) throw new BadRequestException("Username en uso.");
  }
}
