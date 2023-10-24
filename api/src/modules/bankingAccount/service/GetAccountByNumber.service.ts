import NotFoundException from "../../../exception/NotFoundException";
import accountInterface from "../interface/account.interface";
import AccountModel from "../model/account.model";

export default class GetAccountByNumberService {
  async run(number_account: string): Promise<accountInterface> {
    const account = await AccountModel.findOne({ where: { number_account } });
    if (!account) throw new NotFoundException("Cuenta no encontrada");
    return account;
  }
}
