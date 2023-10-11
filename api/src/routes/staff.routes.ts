import { Router } from "express";
import { registerCustomerController } from "../modules/staff/controller/registerCustomer.controller";
import { createCustomerValidator } from "../middleware/ValidatorManager";
const router = Router();

router.post(
  "/customer/register",
  createCustomerValidator,
  registerCustomerController
);

export default router;
