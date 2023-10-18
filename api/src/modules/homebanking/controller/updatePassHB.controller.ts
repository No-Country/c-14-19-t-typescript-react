import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import UpdatePasswordHBUC from "../usecase/UpdatePasswordHBUC";

export const updatePassHCController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const idJwt = req.id_user;
  const password = req.body.password;
  const usecase = new UpdatePasswordHBUC();

  try {
    const data = await usecase.run(id, password, idJwt);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
