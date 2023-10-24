import UnauthorizedException from "../exception/UnauthorizedException";

export default class AuthorizationManager {
  static checkIdentity(id: string, idJwt: string): void {
    if (id != idJwt) {
      throw new UnauthorizedException();
    }
  }

  static validateDepartment(department: string, verify: string[]) {
    if (verify.indexOf(department) === -1) {
      throw new UnauthorizedException();
    }
  }
}
