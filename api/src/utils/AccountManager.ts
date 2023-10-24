export default class AccountManager {
  static generateNumber(): string {
    const initialValue: number = Math.floor(Math.random() * 100000000000);
    const finalValue: number = Math.floor(Math.random() * 100000000000);
    const value = `${initialValue}${finalValue}`;
    return value.slice(0, 20);
  }
}
