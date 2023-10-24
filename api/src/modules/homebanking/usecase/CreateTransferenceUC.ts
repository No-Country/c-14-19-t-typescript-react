import AuthorizationManager from "../../../utils/AuthotizationManager";
import GetAccountByNumberService from "../../bankingAccount/service/GetAccountByNumber.service";
import tranferenceBodyInterface from "../../transference/interface/transferenceBody.interface";
import transferenceInterface from "../../transference/interface/transferenceInterface";
import CreateTransferenceService from "../../transference/service/CreateTransference.service";

export default class CreateTransferenceUC {
  private readonly createTransferenceService: CreateTransferenceService;
  private readonly getAccountByNumberService: GetAccountByNumberService;
  constructor() {
    this.createTransferenceService = new CreateTransferenceService();
    this.getAccountByNumberService = new GetAccountByNumberService();
  }

  async run(
    data: tranferenceBodyInterface,
    idJwt: string
  ): Promise<transferenceInterface> {
    //check authorization:
    const sender = await this.getAccountByNumberService.run(
      data.sender_number_account
    );
    AuthorizationManager.checkIdentity(sender.id_user, idJwt);

    return await this.createTransferenceService.run(data);
  }
}
