import { NextFunction, Response } from "express";
import requestExt from "../modules/staff/interface/requestExt";
import JwtManager from "../utils/JwtManager";
import payloadRequest from "../utils/payloadRequest";
import homebankingModelInterface from "../modules/homebanking/interface/homebankingModel.interface";
import HomebankingModel from "../modules/homebanking/model/homebanking.model";
import UserModel from "../modules/user/model/user.model";

export default async function requireHBAccount(
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

    const hbAccount: homebankingModelInterface = await HomebankingModel.findOne(
      { where: { id: payload.id }, include: [{ model: UserModel }] }
    );
    if (!hbAccount)
      return res.status(404).json({ msg: "Cuenta no encontrada" });

    req.id_user = hbAccount.user.id;

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
