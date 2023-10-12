import { Request } from "express";
import DEPARTMENT from "../enum/DEPARTMENT";

export default interface requestExt extends Request {
  department?: DEPARTMENT;
  id_user?: string;
  id_staff?: string;
}
