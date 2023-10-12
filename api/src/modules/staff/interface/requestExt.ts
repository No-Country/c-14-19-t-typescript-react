import { Request } from "express";

export default interface requestExt extends Request {
  department?: string;
  id_user?: string;
  id_staff?: string;
}
