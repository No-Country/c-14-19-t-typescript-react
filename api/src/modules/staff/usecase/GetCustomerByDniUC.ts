import NotFoundException from "../../../exception/NotFoundException";
import AuthorizationManager from "../../../utils/AuthotizationManager";
import { userModelInterface } from "../../user/interface/userModel.interface";
import UserModel from "../../user/model/user.model";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class GetCustomerByDniUC {
  async run(dni: number, department: DEPARTMENT): Promise<userModelInterface> {
    //check authorization:
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.ATTENTION]);

    //get customer:
    return await this.getCustomer(dni);
  }

  private async getCustomer(dni: number): Promise<userModelInterface> {
    const user = await UserModel.findOne({ where: { dni } });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }
}
