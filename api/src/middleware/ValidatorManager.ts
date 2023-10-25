import { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

const validatorManager = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

/**  CREATE CUSTOMER  **/

export const createCustomerValidator = [
  body("name")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 3, max: 25 })
    .matches(
      /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    ),
  body("lastname")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 3, max: 25 })
    .matches(
      /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    ),
  body("mail").isEmail(),
  body("birthday").trim().isString().isLength({ min: 6, max: 8 }),
  body("dni").matches(/^\d{7,8}$/),
  body("cellphone").matches(/^\d{10,12}$/),
  validatorManager,
];

/**  CREATE STAFF  **/

export const createStaffValidator = [
  body("name")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 3, max: 25 })
    .matches(
      /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    ),
  body("lastname")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 3, max: 25 })
    .matches(
      /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
    ),
  body("mail").isEmail(),
  body("birthday").trim().isString().isLength({ min: 6, max: 8 }),
  body("dni").matches(/^\d{7,8}$/),
  body("cellphone").matches(/^\d{10,12}$/),
  body("username").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("password").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("department").trim().escape().isString().isIn(["attention", "hhrr"]),
  validatorManager,
];

/**  LOGIN   **/

export const loginValidator = [
  body("username").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("password").trim().escape().isString().isLength({ min: 6, max: 25 }),
  validatorManager,
];

/**  UPDATE CUSTOMER  **/

export const updateValidation = [
  body("mail").isEmail().optional(),
  body("cellphone")
    .matches(/^\d{10,12}$/)
    .optional(),
  validatorManager,
];

/**  REGISTER HOMEBANKING  **/
export const registerHBValidation = [
  body("username").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("password").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("reference_code")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 9, max: 10 }),
  validatorManager,
];

/**  PASSWORD VALIDATOR  **/
export const passwordValidator = [
  body("password").trim().escape().isString().isLength({ min: 6, max: 25 }),
  validatorManager,
];

/**  RECOVER VALIDATOR  **/

export const recoverValidator = [
  body("username").trim().escape().isString().isLength({ min: 6, max: 25 }),
  body("reference_code")
    .trim()
    .escape()
    .isString()
    .isLength({ min: 9, max: 10 }),
  validatorManager,
];
