import { NextFunction, Response } from "express";
import requestExt from "../modules/staff/interface/requestExt";
import payloadRequest from "../utils/payloadRequest";
import JwtManager from "../utils/JwtManager";
import staffModelInterface from "../modules/staff/interface/staffModel.interface";
import StaffModel from "../modules/staff/model/staff.model";
import UserModel from "../modules/user/model/user.model";

export default async function requireStaffSession(
  req: requestExt,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.body.sessionToken;

    if (!sessionToken)
      return res.status(401).json({ msg: "Token de sesión requerido" });

    const payload: payloadRequest = JwtManager.verifySessionToken(
      sessionToken
    ) as payloadRequest;

    const staff: staffModelInterface = await StaffModel.findOne({
      where: { id: payload.id },
      attributes: { exclude: ["password", "id_user"] },
      include: [{ model: UserModel }],
    });
    if (!staff) return res.status(401).json({ msg: "Usuario inválido" });

    return res
      .status(200)
      .json({ jwt: JwtManager.generateStaffAuthorization(payload.id), staff });
  } catch (error) {
    return res.status(401).json({ msg: "No autorizado" });
  }
}
