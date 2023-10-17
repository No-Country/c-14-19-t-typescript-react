import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import DEPARTMENT from "../enum/DEPARTMENT";
import UpdateCustomerUC from "../usecase/UpdateCustomerUC";

export const updateCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const department = req.department as DEPARTMENT;
  const body = req.body;
  const usecase = new UpdateCustomerUC();

  try {
    const data = await usecase.run(id, body, department);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
