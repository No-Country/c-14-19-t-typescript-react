import UnauthorizedException from "../exception/UnauthorizedException";

export default class AuthorizationManager {
  static checkIdentity(id: string, idJwt: string): void {
    if (id !== idJwt) {
      throw new UnauthorizedException();
    }
  }
}
