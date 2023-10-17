import { NextFunction, Response } from "express";
import requestExt from "../modules/staff/interface/requestExt";
import JwtManager from "../utils/JwtManager";
import payloadRequest from "../utils/payloadRequest";
import staffModelInterface from "../modules/staff/interface/staffModel.interface";
import StaffModel from "../modules/staff/model/staff.model";

export default async function requireStaff(
  req: requestExt,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers?.authorization;
    if (!token) return res.status(401).json({ msg: "Token requerido" });
    token = token.split(" ")[1];

    const payload = JwtManager.verifyStaffAuthorization(
      token
    ) as payloadRequest;

    const staff: staffModelInterface = await StaffModel.findOne({
      where: { id: payload.id },
    });
    if (!staff) return res.status(404).json({ msg: "Staff no encontrado" });

    req.id_staff = staff.id;
    req.department = staff.department;

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message === "invalid signature" ||
        error.message === "invalid token"
      ) {
        return res.status(401).json("Token inválido");
      } else if (error.message === "jwt expired") {
        return res.status(401).json("Token expirado");
      } else {
        return res.status(401).json("No authorizado");
      }
    }
  }
}
