import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import ListAccountUC from "../usecase/ListAccountsUC";

export const listAccountController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const idJwt = req.id_user;
  const usecase = new ListAccountUC();

  try {
    const data = await usecase.run(id, idJwt);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
