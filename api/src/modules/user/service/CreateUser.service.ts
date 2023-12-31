import userCreateInterface from "../interface/userCreate.interface";
import { userModelInterface } from "../interface/userModel.interface";
import ReferenceCodeGenerator from "../utils/ReferenceCodeGenerator";
import UserModel from "../model/user.model";
import BadRequestException from "../../../exception/BadRequestException";
import ROLE from "../enum/ROLE";
import MailSenderService from "./MailSender.service";

export default class CreateUserService {
  private readonly mailSenderService: MailSenderService;

  constructor() {
    this.mailSenderService = new MailSenderService();
  }

  async run(
    id_user: string,
    data: userCreateInterface,
    role: ROLE
  ): Promise<userModelInterface> {
    //check data:
    await this.checkMail(data.mail);
    await this.checkDni(data.dni);
    await this.checkCellphone(data.cellphone);

    const reference_code = ReferenceCodeGenerator.Generate(
      data.name,
      data.lastname
    );

    const newUser: userModelInterface = await UserModel.create({
      ...data,
      id: id_user,
      reference_code,
      role,
    });

    //send reference code if user is customer:
    if (newUser.role === ROLE.CUSTOMER) {
      await this.mailSenderService.run(newUser);
    }

    return newUser;
  }

  private async checkMail(mail: string): Promise<void> {
    const check = await UserModel.findOne({ where: { mail } });

    if (check) throw new BadRequestException("Mail en uso");
  }

  private async checkDni(dni: number): Promise<void> {
    const check = await UserModel.findOne({ where: { dni } });
    if (check) throw new BadRequestException("DNI en uso");
  }
  private async checkCellphone(cellphone: number): Promise<void> {
    const check = await UserModel.findOne({ where: { cellphone } });
    if (check) throw new BadRequestException("Celular en uso");
  }
}
