import ROLE from "../../user/enum/ROLE";
import userCreateInterface from "../../user/interface/userCreate.interface";
import CreateUserService from "../../user/service/CreateUser.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class RegisterCustomerUC {
  private readonly createUserService: CreateUserService;

  constructor() {
    this.createUserService = new CreateUserService();
  }

  async run(
    department: DEPARTMENT,
    data: userCreateInterface
  ): Promise<{ msg: string }> {
    await this.createUserService.run(data, ROLE.CUSTOMER);
    return { msg: "Registro exitoso" };
  }
}
