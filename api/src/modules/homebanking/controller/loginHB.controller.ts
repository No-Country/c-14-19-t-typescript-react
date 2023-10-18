import { NextFunction, Request, Response } from "express";
import LoginHomebankingUC from "../usecase/LoginHomebankingUC";

export const loginHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const usecase = new LoginHomebankingUC();

  try {
    const data = await usecase.run(body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
