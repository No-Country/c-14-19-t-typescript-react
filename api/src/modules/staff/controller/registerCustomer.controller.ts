import { NextFunction, Response } from "express";
import RegisterCustomerUC from "../usecase/RegisterCustomerUC";
import requestExt from "../interface/requestExt";

export const registerCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const usecase = new RegisterCustomerUC();
  const body = req.body;
  const department = req.department;
  try {
    const data = await usecase.run(department, body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
