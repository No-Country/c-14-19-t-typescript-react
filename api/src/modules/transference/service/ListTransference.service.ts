import AccountModel from "../../bankingAccount/model/account.model";
import UserModel from "../../user/model/user.model";
import transferenceInterface from "../interface/transferenceInterface";
import TransferenceModel from "../model/transference.model";
import { Op } from "sequelize";

export default class ListTransferenceService {
  async run(number_account: string): Promise<transferenceInterface[]> {
    return await TransferenceModel.findAll({
      where: {
        [Op.or]: {
          sender_number_account: number_account,
          receiver_number_account: number_account,
        },
      },
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
      limit: 10,
    });
  }
}
