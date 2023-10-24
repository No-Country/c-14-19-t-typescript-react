import AuthorizationManager from "../../../utils/AuthotizationManager";
import DeleteAccountService from "../../bankingAccount/service/DeleteAccount.service";
import GetAccountByNumberService from "../../bankingAccount/service/GetAccountByNumber.service";

export default class DeleteAccountUC {
  private readonly deleteAccountService: DeleteAccountService;
  private readonly getAccountByNumberService: GetAccountByNumberService;

  constructor() {
    this.deleteAccountService = new DeleteAccountService();
    this.getAccountByNumberService = new GetAccountByNumberService();
  }
  async run(number_account: string, idJwt: string): Promise<{ msg: string }> {
    const account = await this.getAccountByNumberService.run(number_account);

    //check authorization:
    AuthorizationManager.checkIdentity(account.id_user, idJwt);

    return await this.deleteAccountService.run(number_account);
  }
}
