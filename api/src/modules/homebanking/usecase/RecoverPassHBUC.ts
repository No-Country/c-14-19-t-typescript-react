import BadRequestException from "../../../exception/BadRequestException";
import JwtManager from "../../../utils/JwtManager";
import UserModel from "../../user/model/user.model";
import hbRecoverInterface from "../interface/hbRecover.interface";
import homebankingModelInterface from "../interface/homebankingModel.interface";
import HomebankingModel from "../model/homebanking.model";

export default class RecoverPassHBUC {
  async run(data: hbRecoverInterface): Promise<{ id: string; jwt: string }> {
    //get hb account:
    const hb = await this.getHBAccount(data);

    const jwt = JwtManager.generateRecoverPassToken(hb.id);

    return { id: hb.id, jwt };
  }

  private async getHBAccount(
    data: hbRecoverInterface
  ): Promise<homebankingModelInterface> {
    const hb = await HomebankingModel.findOne({
      where: { username: data.username },
      include: [{ model: UserModel }],
    });

    if (!hb) throw new BadRequestException("Usuario inválido");

    if (hb.user.reference_code !== data.reference_code) {
      throw new BadRequestException("Usuario inválido");
    }
    return hb;
  }
}
