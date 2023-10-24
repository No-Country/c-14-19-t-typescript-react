import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import CreateAccountUC from "../usecase/CreateAccountUC";

export const createAccountController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const idJwt = req.id_user;
  const id_user = req.body.id_user;
  const usecase = new CreateAccountUC();

  try {
    const data = await usecase.run(id_user, idJwt);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
