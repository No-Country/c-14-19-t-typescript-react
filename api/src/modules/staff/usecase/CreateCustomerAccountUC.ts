import AuthorizationManager from "../../../utils/AuthotizationManager";
import accountInterface from "../../bankingAccount/interface/account.interface";
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
  ): Promise<accountInterface> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    //create account:
    return await this.createAccountService.run(id_user);
  }
}
