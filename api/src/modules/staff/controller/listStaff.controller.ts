import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import ListStaffUC from "../usecase/ListStaffUC";
import DEPARTMENT from "../enum/DEPARTMENT";

export const listStaffController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const department = req.department as DEPARTMENT;
  const usecase = new ListStaffUC();

  try {
    const data = await usecase.run(department);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
