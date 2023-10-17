import ValidateDepartment from "../../../utils/ValidateDepartment";
import { userModelInterface } from "../../user/interface/userModel.interface";
import userUpdateInterface from "../../user/interface/userUpdate.interface";
import UpdateUserService from "../../user/service/UpdateUser.service";
import DEPARTMENT from "../enum/DEPARTMENT";

export default class UpdateCustomerUC {
  private readonly updateUserService: UpdateUserService;

  constructor() {
    this.updateUserService = new UpdateUserService();
  }

  async run(
    id: string,
    data: userUpdateInterface,
    department: string
  ): Promise<userModelInterface> {
    //check authorization:
    ValidateDepartment.validate(department, [DEPARTMENT.ATTENTION]);

    return await this.updateUserService.run(id, data);
  }
}
