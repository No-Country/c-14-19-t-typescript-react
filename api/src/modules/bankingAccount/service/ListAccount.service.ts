import GetUserByIdService from "../../user/service/GetUserById.service";
import accountModelInterface from "../interface/accountModel.interface";
import AccountModel from "../model/account.model";

export default class ListAccountService {
  private readonly getUserByIdService: GetUserByIdService;

  constructor() {
    this.getUserByIdService = new GetUserByIdService();
  }
  async run(id_user: string): Promise<accountModelInterface[]> {
    //check user:
    await this.checkUser(id_user);

    return await AccountModel.findAll({ where: { id_user } });
  }

  private async checkUser(id: string): Promise<void> {
    await this.getUserByIdService.run(id);
  }
}
