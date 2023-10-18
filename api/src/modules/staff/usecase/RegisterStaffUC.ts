import CreateUserService from "../../user/service/CreateUser.service";
import DEPARTMENT from "../enum/DEPARTMENT";
import staffCreateInterface from "../interface/staffCreate.interface";
import staffModelInterface from "../interface/staffModel.interface";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import StaffModel from "../model/staff.model";
import BadRequestException from "../../../exception/BadRequestException";
import ROLE from "../../user/enum/ROLE";
import ValidateDepartment from "../../../utils/ValidateDepartment";
import DeleteUserService from "../../user/service/DeleteUser.service";

export default class RegisterStaffUC {
  private readonly createUserService: CreateUserService;
  private readonly deleteUserService: DeleteUserService;

  constructor() {
    this.createUserService = new CreateUserService();
    this.deleteUserService = new DeleteUserService();
  }

  async run(
    data: staffCreateInterface,
    department: DEPARTMENT
  ): Promise<{ msg: string }> {
    //check authorization
    ValidateDepartment.validate(department, [DEPARTMENT.HHRR]);

    //check username
    await this.checkUsername(data.username);

    const id_user = uuid();
    const id_staff = uuid();

    try {
      await this.createUserService.run(
        id_user,
        {
          name: data.name,
          lastname: data.lastname,
          birthday: data.birthday,
          cellphone: data.cellphone,
          dni: data.dni,
          mail: data.mail,
        },
        ROLE.STAFF
      );

      await this.createStaff(id_staff, {
        username: data.username,
        password: data.password,
        department: data.department,
        id_user,
      });

      return { msg: "Registro exitoso" };
    } catch (error) {
      await this.deleteUserService.run(id_user);
      throw error;
    }
  }

  private async createStaff(
    id_staff: string,
    data: {
      username: string;
      password: string;
      department: DEPARTMENT;
      id_user: string;
    }
  ): Promise<staffModelInterface> {
    const hashPass = await hash(data.password, 8);

    return await StaffModel.create({
      id: id_staff,
      username: data.username,
      password: hashPass,
      id_user: data.id_user,
      department: data.department,
    });
  }

  private async checkUsername(username: string): Promise<void> {
    const check = await StaffModel.findOne({ where: { username } });
    if (check) throw new BadRequestException("Username en uso");
  }
}
