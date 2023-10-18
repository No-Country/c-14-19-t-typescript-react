import BadRequestException from "../../../exception/BadRequestException";
import NotFoundException from "../../../exception/NotFoundException";
import JwtManager from "../../../utils/JwtManager";
import UserModel from "../../user/model/user.model";
import hbLoginInterface from "../interface/hbLogin.interface";
import homebankingModelInterface from "../interface/homebankingModel.interface";
import HomebankingModel from "../model/homebanking.model";
import { compare } from "bcryptjs";

export default class LoginHomebankingUC {
  async run(data: hbLoginInterface) {
    //get account:
    const hb = await this.getHBAccount(data.username);

    //check password:
    await this.comparePassword(data.password, hb.password);

    //
    const jwt = JwtManager.generateHBAuthorization(hb.id);
    const jwtSession = JwtManager.generateSessionToken(hb.id);

    return {
      jwt,
      jwtSession,
      homebanking: {
        id: hb.id,
        username: hb.username,
        user: hb.user,
      },
    };
  }

  private async getHBAccount(
    username: string
  ): Promise<homebankingModelInterface> {
    const hb = await HomebankingModel.findOne({
      where: { username },
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ["reference_code", "role", "createdAt", "updatedAt"],
          },
        },
      ],
    });
    if (!hb) throw new NotFoundException("Usuario no encontrado");
    return hb;
  }

  private async comparePassword(pass: string, hash: string): Promise<void> {
    const check = await compare(pass, hash);
    if (!check) throw new BadRequestException("Credenciales inválidas");
  }
}
