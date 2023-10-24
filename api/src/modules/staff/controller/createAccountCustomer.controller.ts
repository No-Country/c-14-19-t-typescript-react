import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import CreateCustomerAccountUC from "../usecase/CreateCustomerAccountUC";
import DEPARTMENT from "../enum/DEPARTMENT";

export const createAccountCustomerController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const id_user = req.body.id_user;
  const department = req.department as DEPARTMENT;
  const usecase = new CreateCustomerAccountUC();

  try {
    const data = await usecase.run(id_user, department);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};
