import userCreateInterface from "../../user/interface/userCreate.interface";
import DEPARTMENT from "../enum/DEPARTMENT";

export default interface staffCreateInterface extends userCreateInterface {
  username: string;
  password: string;
  department: DEPARTMENT;
}
