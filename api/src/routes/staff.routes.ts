import { Router } from "express";
import { registerCustomerController } from "../modules/staff/controller/registerCustomer.controller";
import {
  createCustomerValidator,
  createStaffValidator,
  loginValidator,
} from "../middleware/ValidatorManager";
import { registerStaffController } from "../modules/staff/controller/registerStaff.controller";
import { LoginStaffController } from "../modules/staff/controller/LoginStaff.controller";
const router = Router();

router.post(
  "/customer/register",
  createCustomerValidator,
  registerCustomerController
);

router.post("/auth/register", createStaffValidator, registerStaffController);

router.post("/auth/login", loginValidator, LoginStaffController);

export default router;
