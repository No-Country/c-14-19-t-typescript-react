import AuthorizationManager from "../../../utils/AuthotizationManager";
import accountInterface from "../../bankingAccount/interface/account.interface";
import ListAccountService from "../../bankingAccount/service/ListAccount.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class ListCustomerAccountsUC {
  private readonly listAccountService: ListAccountService;

  constructor() {
    this.listAccountService = new ListAccountService();
  }

  async run(id: string, department: DEPARTMENT): Promise<accountInterface[]> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    return await this.listAccountService.run(id);
  }
}
