import UserModel from "../model/user.model";

export default class DeleteUserService {
  async run(id: string): Promise<boolean> {
    const del = await UserModel.destroy({ where: { id } });
    if (del === 0) return false;
    else return true;
  }
}
