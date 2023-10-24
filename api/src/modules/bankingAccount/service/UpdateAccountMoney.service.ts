import AccountModel from "../model/account.model";

export default class UpdateAccountMoneyService {
  async run(number_account: string, money: number): Promise<void> {
    await AccountModel.update({ money }, { where: { number_account } });
  }
}
