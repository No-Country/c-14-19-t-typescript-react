export default class BadRequestException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
