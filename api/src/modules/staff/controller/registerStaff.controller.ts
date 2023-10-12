import { NextFunction, Response } from "express";
import RegisterStaffUC from "../usecase/RegisterStaffUC";
import requestExt from "../interface/requestExt";
import DEPARTMENT from "../enum/DEPARTMENT";

export const registerStaffController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const usecase = new RegisterStaffUC();
  const body = req.body;
  const department = req.department as DEPARTMENT;
  try {
    const data = await usecase.run(body, department);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
