import NotFoundException from "../../../exception/NotFoundException";
import { userModelInterface } from "../interface/userModel.interface";
import UserModel from "../model/user.model";

export default class GetUserByIdService {
  async run(id_user: string): Promise<userModelInterface> {
    const user = await UserModel.findOne({ where: { id: id_user } });
    if (!user) throw new NotFoundException("User not found");

    return user;
  }
}
