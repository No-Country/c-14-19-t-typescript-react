import { NextFunction, Request, Response } from "express";
import RegisterCustomerUC from "../usecase/RegisterCustomerUC";
import DEPARTMENT from "../enum/DEPARTMENT";

export const registerCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usecase = new RegisterCustomerUC();

  const body = req.body;
  try {
    const data = await usecase.run(DEPARTMENT.ATTENTION, body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
