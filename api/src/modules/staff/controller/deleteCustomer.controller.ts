import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import DeleteCustomerUC from "../usecase/DeleteCustomerUC";
import DEPARTMENT from "../enum/DEPARTMENT";

export const deleteCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const department = req.department as DEPARTMENT;
  const usecase = new DeleteCustomerUC();
  try {
    const data = await usecase.run(id, department);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
