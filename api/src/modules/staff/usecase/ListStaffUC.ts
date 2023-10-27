import AuthorizationManager from "../../../utils/AuthotizationManager";
import UserModel from "../../user/model/user.model";
import DEPARTMENT from "../enum/DEPARTMENT";
import staffModelInterface from "../interface/staffModel.interface";
import StaffModel from "../model/staff.model";

export default class ListStaffUC {
  async run(department: DEPARTMENT): Promise<staffModelInterface[]> {
    AuthorizationManager.validateDepartment(department, [DEPARTMENT.HHRR]);

    return await this.listStaff();
  }

  private async listStaff(): Promise<staffModelInterface[]> {
    return await StaffModel.findAll({
      attributes: ["id", "username", "department"],
      include: [
        {
          model: UserModel,
          attributes: [
            "name",
            "lastname",
            "mail",
            "birthday",
            "dni",
            "cellphone",
          ],
        },
      ],
    });
  }
}
