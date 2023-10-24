import AuthorizationManager from "../../../utils/AuthotizationManager";
import DeleteUserService from "../../user/service/DeleteUser.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class DeleteCustomerUC {
  private readonly deleteUserService: DeleteUserService;

  constructor() {
    this.deleteUserService = new DeleteUserService();
  }
  async run(id: string, department: DEPARTMENT): Promise<{ msg: string }> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    const del: boolean = await this.deleteUserService.run(id);

    if (del) return { msg: "Cliente eliminado" };
    else return { msg: "Error al eliminar cliente" };
  }
}
