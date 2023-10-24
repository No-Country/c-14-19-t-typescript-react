import AccountModel from "../model/account.model";

export default class DeleteAccountService {
  async run(number_account: string): Promise<{ msg: string }> {
    const del: number = await AccountModel.destroy({
      where: { number_account },
    });
    if (del === 0) return { msg: "Error eliminando cuenta" };
    return { msg: "Cuenta eliminada" };
  }
}
