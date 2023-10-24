import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import DEPARTMENT from "../enum/DEPARTMENT";
import ListCustomerAccountsUC from "../usecase/ListCustomerAccountsUC";

export const listAccountCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const department = req.department as DEPARTMENT;
  const usecase = new ListCustomerAccountsUC();

  try {
    const data = await usecase.run(id, department);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
