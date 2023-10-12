import ROLE from "../enum/ROLE";

export default interface userCreateInterface {
  name: string;
  lastname: string;
  birthday: string;
  dni: number;
  mail: string;
  cellphone: number;
  role?: ROLE;
}
