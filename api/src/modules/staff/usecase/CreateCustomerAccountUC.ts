import AuthorizationManager from "../../../utils/AuthotizationManager";
import accountCreatedInterface from "../../bankingAccount/interface/accountCreated.interface";
import CreateAccountService from "../../bankingAccount/service/CreateAccount.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class CreateCustomerAccountUC {
  private readonly createAccountService: CreateAccountService;

  constructor() {
    this.createAccountService = new CreateAccountService();
  }

  async run(
    id_user: string,
    department: DEPARTMENT
  ): Promise<accountCreatedInterface> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    //create account:
    return await this.createAccountService.run(id_user);
  }
}
