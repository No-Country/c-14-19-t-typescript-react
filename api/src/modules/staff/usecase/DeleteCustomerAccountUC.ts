import AuthorizationManager from "../../../utils/AuthotizationManager";
import DeleteAccountService from "../../bankingAccount/service/DeleteAccount.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class DeleteCustomerAccountUC {
  private readonly deleteAccountService: DeleteAccountService;

  constructor() {
    this.deleteAccountService = new DeleteAccountService();
  }

  async run(
    number_account: string,
    department: DEPARTMENT
  ): Promise<{ msg: string }> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    return await this.deleteAccountService.run(number_account);
  }
}
