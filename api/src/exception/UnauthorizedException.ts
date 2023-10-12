export default class UnauthorizedException extends Error {
  constructor() {
    super("Usuario no autorizado");
  }
}
