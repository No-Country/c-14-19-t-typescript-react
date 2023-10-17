import { NextFunction, Response } from "express";
import requestExt from "../interface/requestExt";
import GetCustomerByDniUC from "../usecase/GetCustomerByDniUC";
import DEPARTMENT from "../enum/DEPARTMENT";

export const getCustomerByIdController = async (
  req: requestExt,
  res: Response,
  next: NextFunction
) => {
  const dni = parseInt(req.params.dni);
  const department = req.department as DEPARTMENT;
  const usecase = new GetCustomerByDniUC();

  try {
    const data = await usecase.run(dni, department);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
