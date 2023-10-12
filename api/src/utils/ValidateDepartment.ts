import UnauthorizedException from "../exception/UnauthorizedException";

export default class ValidateDepartment {
  static validate(department: string, verify: string[]) {
    if (verify.indexOf(department) === -1) {
      throw new UnauthorizedException();
    }
  }
}
