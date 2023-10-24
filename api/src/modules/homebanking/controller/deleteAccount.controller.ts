import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import DeleteAccountUC from "../usecase/DeleteAccountUC";

export const deleteAccountController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const number_account = req.params.na;
  const idJwt = req.id_user;
  const usecase = new DeleteAccountUC();

  try {
    const data = await usecase.run(number_account, idJwt);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
