import NotFoundException from "../../../exception/NotFoundException";
import UnauthorizedException from "../../../exception/UnauthorizedException";
import AuthorizationManager from "../../../utils/AuthotizationManager";
import userUpdateInterface from "../../user/interface/userUpdate.interface";
import UserModel from "../../user/model/user.model";
import UpdateUserService from "../../user/service/UpdateUser.service";
import homebankingModelInterface from "../interface/homebankingModel.interface";
import HomebankingModel from "../model/homebanking.model";

export default class UpdateUserDataUC {
  private readonly updateUserService: UpdateUserService;

  constructor() {
    this.updateUserService = new UpdateUserService();
  }

  async run(
    id: string,
    data: userUpdateInterface,
    idJwt: string
  ): Promise<homebankingModelInterface> {
    //get homebanking account:
    const hbAccount = await this.getHomebanking(id);
    //check authorization:
    AuthorizationManager.checkIdentity(hbAccount.user.id, idJwt);

    //update data:
    const userUpdated = await this.updateUserService.run(
      hbAccount.user.id,
      data
    );

    hbAccount.user.mail = userUpdated.mail;
    hbAccount.user.cellphone = userUpdated.cellphone;

    return hbAccount;
  }

  private async getHomebanking(id: string): Promise<homebankingModelInterface> {
    const hbAccount = await HomebankingModel.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "id_user"],
      },
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "reference_code"],
          },
        },
      ],
    });
    if (!hbAccount) throw new NotFoundException("Usuario no encontrado");
    return hbAccount;
  }
}
