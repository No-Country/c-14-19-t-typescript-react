import AuthorizationManager from "../../../utils/AuthotizationManager";
import accountCreatedInterface from "../../bankingAccount/interface/accountCreated.interface";
import CreateAccountService from "../../bankingAccount/service/CreateAccount.service";

export default class CreateAccountUC {
  private readonly createAccountService: CreateAccountService;

  constructor() {
    this.createAccountService = new CreateAccountService();
  }

  async run(id_user: string, idJwt: string): Promise<accountCreatedInterface> {
    //check authorization:
    AuthorizationManager.checkIdentity(id_user, idJwt);

    return await this.createAccountService.run(id_user);
  }
}
