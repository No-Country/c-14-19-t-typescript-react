import { NextFunction, Request, Response } from "express";
import RegisterHomebankingUC from "../usecase/RegisterHomebankingUC";

export const registerHBController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usecase = new RegisterHomebankingUC();
  const body = req.body;

  try {
    const data = await usecase.run(body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
