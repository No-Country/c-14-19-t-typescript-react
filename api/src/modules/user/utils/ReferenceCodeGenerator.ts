export default class ReferenceCodeGenerator {
  static Generate(name: string, lastname: string): string {
    const randomNumber: number = Math.floor(
      Math.random() * 89999999 + 10000000
    );

    return `${name[0]}${lastname[0]}${randomNumber}`;
  }
}
