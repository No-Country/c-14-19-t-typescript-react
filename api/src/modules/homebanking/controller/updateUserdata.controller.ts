import { NextFunction, Response } from "express";
import requestExt from "../../staff/interface/requestExt";
import UpdateUserDataUC from "../usecase/UpdateUserDataUC";

export const updateUserdataController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const idJwt = req.id_user;
  const id = req.params.id;
  const body = req.body;
  const usecase = new UpdateUserDataUC();

  try {
    const data = await usecase.run(id, body, idJwt);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
