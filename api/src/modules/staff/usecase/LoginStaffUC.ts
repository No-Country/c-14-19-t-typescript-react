import BadRequestException from "../../../exception/BadRequestException";
import NotFoundException from "../../../exception/NotFoundException";
import JwtManager from "../../../utils/JwtManager";
import UserModel from "../../user/model/user.model";
import staffLoginInterface from "../interface/staffLogin.interface";
import staffModelInterface from "../interface/staffModel.interface";
import StaffModel from "../model/staff.model";
import { compare } from "bcryptjs";

export default class LoginStaffUC {
  async run(data: staffLoginInterface) {
    //get staff
    const staff = await this.getStaff(data.username);

    //check pass:
    await this.checkPassword(data.password, staff.password);

    const jwt = JwtManager.generateStaffAuthorization(staff.id);
    const jwtSession = JwtManager.generateSessionToken(staff.id);

    return {
      jwt,
      jwtSession,
      staff: {
        id: staff.id,
        username: staff.username,
        department: staff.department,
        user: staff.user,
      },
    };
  }

  private async getStaff(username: string): Promise<staffModelInterface> {
    const staff = await StaffModel.findOne({
      where: { username },
      include: [{ model: UserModel }],
    });

    if (!staff) throw new NotFoundException("Staff no encontrado");
    return staff;
  }

  private async checkPassword(pass: string, hashPass: string): Promise<void> {
    const checkPass = await compare(pass, hashPass);

    if (!checkPass) throw new BadRequestException("Credenciales inválidas");
  }
}
