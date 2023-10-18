import { NextFunction, Response } from "express";
import requestExt from "../modules/staff/interface/requestExt";
import payloadRequest from "../utils/payloadRequest";
import JwtManager from "../utils/JwtManager";
import UserModel from "../modules/user/model/user.model";
import homebankingModelInterface from "../modules/homebanking/interface/homebankingModel.interface";
import HomebankingModel from "../modules/homebanking/model/homebanking.model";

export default async function requireHBSession(
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

    const hbAccount: homebankingModelInterface = await HomebankingModel.findOne(
      {
        where: { id: payload.id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "id_user"],
        },
        include: [
          {
            model: UserModel,
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "reference_code"],
            },
          },
        ],
      }
    );

    if (!hbAccount) return res.status(401).json({ msg: "Usuario inválido" });

    return res.status(200).json({
      jwt: JwtManager.generateHBAuthorization(payload.id),
      hbAccount,
    });
  } catch (error) {
    return res.status(401).json({ msg: "No autorizado" });
  }
}
