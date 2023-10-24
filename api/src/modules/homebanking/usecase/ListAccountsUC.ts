import AuthorizationManager from "../../../utils/AuthotizationManager";
import accountInterface from "../../bankingAccount/interface/account.interface";
import ListAccountService from "../../bankingAccount/service/ListAccount.service";

export default class ListAccountUC {
  private readonly listAccountService: ListAccountService;

  constructor() {
    this.listAccountService = new ListAccountService();
  }

  async run(id_user: string, idJwt: string): Promise<accountInterface[]> {
    //check authorization:
    AuthorizationManager.checkIdentity(id_user, idJwt);

    return await this.listAccountService.run(id_user);
  }
}
