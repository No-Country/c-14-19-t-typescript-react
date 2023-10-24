import BadRequestException from "../../../exception/BadRequestException";
import AccountManager from "../../../utils/AccountManager";
import accountInterface from "../interface/account.interface";
import AccountModel from "../model/account.model";
import ListAccountService from "./ListAccount.service";

export default class CreateAccountService {
  private readonly listAccountService: ListAccountService;

  constructor() {
    this.listAccountService = new ListAccountService();
  }

  async run(id_user: string): Promise<accountInterface> {
    //check account's limit:
    await this.checkAccountLimits(id_user);

    //create account:
    const number_account = AccountManager.generateNumber();

    const newAccount = await AccountModel.create({
      number_account,
      id_user,
      money: 0,
    });

    return { number_account, id_user, money: newAccount.money };
  }

  private async checkAccountLimits(id: string): Promise<void> {
    const accounts = await this.listAccountService.run(id);
    if (accounts.length === 5)
      throw new BadRequestException("Limite de cuentas alcanzado");
  }
}
