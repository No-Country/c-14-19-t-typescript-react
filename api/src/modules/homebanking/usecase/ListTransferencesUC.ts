import AuthorizationManager from "../../../utils/AuthotizationManager";
import GetAccountByNumberService from "../../bankingAccount/service/GetAccountByNumber.service";
import transferenceInterface from "../../transference/interface/transferenceInterface";
import ListTransferenceService from "../../transference/service/ListTransference.service";

export default class ListTransferencesUC {
  private readonly listTransferenceService: ListTransferenceService;
  private readonly getAccountByNumberService: GetAccountByNumberService;

  constructor() {
    this.listTransferenceService = new ListTransferenceService();
    this.getAccountByNumberService = new GetAccountByNumberService();
  }

  async run(
    number_account: string,
    idJwt: string
  ): Promise<transferenceInterface[]> {
    //check account:
    const account = await this.getAccountByNumberService.run(number_account);

    //check authorization:
    AuthorizationManager.checkIdentity(account.id_user, idJwt);

    return await this.listTransferenceService.run(number_account);
  }
}
