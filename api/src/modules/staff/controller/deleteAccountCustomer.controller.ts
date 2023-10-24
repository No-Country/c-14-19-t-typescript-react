import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import DEPARTMENT from "../enum/DEPARTMENT";
import DeleteCustomerAccountUC from "../usecase/DeleteCustomerAccountUC";

export const deleteAccountCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const department = req.department as DEPARTMENT;
  const number_account = req.params.na;
  const usecase = new DeleteCustomerAccountUC();

  try {
    const data = await usecase.run(number_account, department);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
