import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

const validatorManager = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const createCustomerValidator = [
  body("name").trim().escape().isString().isLength({ min: 3, max: 25 }),
  body("lastname").trim().escape().isString().isLength({ min: 3, max: 25 }),
  body("mail").isEmail(),
  body("birthday").trim().isString().isLength({ min: 6, max: 8 }),
  body("dni").custom((value) => {
    if (value.toString().length > 8 || value.toString().length < 7) {
      throw new Error("invalid dni length");
    }
    return true;
  }),
  body("cellphone").custom((value) => {
    if (value.toString().length > 15 || value.toString().length < 10) {
      throw new Error("invalid cellphone length");
    }
    return true;
  }),
  validatorManager,
];
