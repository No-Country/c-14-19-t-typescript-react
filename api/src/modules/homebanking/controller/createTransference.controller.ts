import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import CreateTransferenceUC from "../usecase/CreateTransferenceUC";

export const createTransferenceController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const idJwt = req.id_user;
  const body = req.body;
  const usecase = new CreateTransferenceUC();

  try {
    const data = await usecase.run(body, idJwt);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
