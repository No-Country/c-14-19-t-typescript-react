import ROLE from "../../user/enum/ROLE";
import userCreateInterface from "../../user/interface/userCreate.interface";
import CreateUserService from "../../user/service/CreateUser.service";
import { v4 as uuid } from "uuid";
import DEPARTMENT from "../enum/DEPARTMENT";
import ValidateDepartment from "../../../utils/ValidateDepartment";

export default class RegisterCustomerUC {
  private readonly createUserService: CreateUserService;

  constructor() {
    this.createUserService = new CreateUserService();
  }

  async run(
    department: DEPARTMENT,
    data: userCreateInterface
  ): Promise<{ msg: string }> {
    //check authorization
    ValidateDepartment.validate(department, [DEPARTMENT.ATTENTION]);

    const id: string = uuid();
    await this.createUserService.run(id, data, ROLE.CUSTOMER);

    return { msg: "Registro exitoso" };
  }
}
