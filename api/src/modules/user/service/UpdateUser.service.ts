import BadRequestException from "../../../exception/BadRequestException";
import NotFoundException from "../../../exception/NotFoundException";
import { userModelInterface } from "../interface/userModel.interface";
import userUpdateInterface from "../interface/userUpdate.interface";
import UserModel from "../model/user.model";

export default class UpdateUserService {
  async run(
    id: string,
    data: userUpdateInterface
  ): Promise<userModelInterface> {
    //check user:
    const user = await this.getUser(id);

    //check data:
    if (data.mail) {
      if (data.mail != user.mail) {
        await this.checkMail(data.mail);
      }
    }
    if (data.cellphone) {
      if (data.cellphone != user.cellphone) {
        await this.checkCellphone(data.cellphone);
      }
    }

    //update:
    await UserModel.update(
      {
        mail: data.mail ?? user.mail,
        cellphone: data.cellphone ?? user.cellphone,
      },
      { where: { id } }
    );

    user.mail = data.mail ?? user.mail;
    user.cellphone = data.cellphone ?? user.cellphone;
    return user;
  }

  private async checkMail(mail: string): Promise<void> {
    const check = await UserModel.findOne({ where: { mail } });

    if (check) throw new BadRequestException("Mail en uso");
  }
  private async checkCellphone(cellphone: number): Promise<void> {
    const check = await UserModel.findOne({ where: { cellphone } });
    if (check) throw new BadRequestException("Celular en uso");
  }

  private async getUser(id: string): Promise<userModelInterface> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }
}
