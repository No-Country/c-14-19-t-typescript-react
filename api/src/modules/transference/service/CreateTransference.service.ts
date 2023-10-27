import BadRequestException from "../../../exception/BadRequestException";
import accountInterface from "../../bankingAccount/interface/account.interface";
import GetAccountByNumberService from "../../bankingAccount/service/GetAccountByNumber.service";
import UpdateAccountMoneyService from "../../bankingAccount/service/UpdateAccountMoney.service";
import tranferenceBodyInterface from "../interface/transferenceBody.interface";
import transferenceInterface from "../interface/transferenceInterface";
import { v4 as uuid } from "uuid";
import TransferenceModel from "../model/transference.model";
import UserModel from "../../user/model/user.model";
import AccountModel from "../../bankingAccount/model/account.model";

export default class CreateTransferenceService {
  private readonly getAccountByNumberService: GetAccountByNumberService;
  private readonly updateAccountMoneyService: UpdateAccountMoneyService;

  constructor() {
    this.getAccountByNumberService = new GetAccountByNumberService();
    this.updateAccountMoneyService = new UpdateAccountMoneyService();
  }
  async run(data: tranferenceBodyInterface): Promise<transferenceInterface> {
    //get accounts:
    const sender = await this.getAccountByNumberService.run(
      data.sender_number_account
    );
    const receiver = await this.getAccountByNumberService.run(
      data.receiver_number_account
    );

    //check equal accounts:
    this.checkEquals(data.sender_number_account, data.receiver_number_account);

    //check available money:
    this.checkMoneyAvailable(data.amount, sender);

    //set new amounts:
    const previousSenderMoney = sender.money;
    const afterSenderMoney = parseFloat(sender.money.toString()) - data.amount;
    const previousReceiverMoney = receiver.money;
    const afterReceiverMoney =
      parseFloat(receiver.money.toString()) + data.amount;

    //transference data:
    const id = uuid();
    const date = new Date().toUTCString();

    //CREATE AND ROLLBACK:
    try {
      await TransferenceModel.create({ ...data, id, date });
      await this.updateAccountMoneyService.run(
        data.sender_number_account,
        afterSenderMoney
      );
      await this.updateAccountMoneyService.run(
        data.receiver_number_account,
        afterReceiverMoney
      );

      return await this.getTransference(id);
    } catch (error) {
      await this.updateAccountMoneyService.run(
        data.sender_number_account,
        previousSenderMoney
      );
      await this.updateAccountMoneyService.run(
        data.receiver_number_account,
        previousReceiverMoney
      );
      await TransferenceModel.destroy({ where: { id } });

      throw error;
    }
  }

  private checkMoneyAvailable(amount: number, account: accountInterface): void {
    if (amount < 1000) throw new BadRequestException("Monto inválido");

    if (account.money < amount)
      throw new BadRequestException("Dinero insuficiente");
  }

  private checkEquals(sender_number: string, receiver_number: string): void {
    if (sender_number === receiver_number)
      throw new BadRequestException("Cuentas idénticas");
  }

  private async getTransference(id: string): Promise<transferenceInterface> {
    return await TransferenceModel.findOne({
      where: { id },
      attributes: ["id", "amount", "date"],
      include: [
        {
          model: AccountModel,
          as: "sender_account",
          attributes: ["number_account"],
          include: [{ model: UserModel, attributes: ["name", "lastname"] }],
        },
        {
          model: AccountModel,
          as: "receiver_account",
          attributes: ["number_account"],
          include: [{ model: UserModel, attributes: ["name", "lastname"] }],
        },
      ],
    });
  }
}
