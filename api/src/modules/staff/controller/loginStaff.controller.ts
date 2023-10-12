import { NextFunction, Request, Response } from "express";
import LoginStaffUC from "../usecase/LoginStaffUC";

export const LoginStaffController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usecase = new LoginStaffUC();
  const body = req.body;

  try {
    const data = await usecase.run(body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
