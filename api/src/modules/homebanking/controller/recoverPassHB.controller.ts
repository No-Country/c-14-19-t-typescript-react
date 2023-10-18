import { NextFunction, Request, Response } from "express";
import RecoverPassHBUC from "../usecase/RecoverPassHBUC";

export const recoverPassHCController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const usecase = new RecoverPassHBUC();

  try {
    const data = await usecase.run(body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
