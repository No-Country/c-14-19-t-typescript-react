import { Router } from "express";
import { registerCustomerController } from "../modules/staff/controller/registerCustomer.controller";
import {
  createCustomerValidator,
  createStaffValidator,
  loginValidator,
  updateValidation,
} from "../middleware/ValidatorManager";
import { registerStaffController } from "../modules/staff/controller/registerStaff.controller";
import { LoginStaffController } from "../modules/staff/controller/loginStaff.controller";

import requireStaff from "../middleware/requireStaff";
import { updateCustomerController } from "../modules/staff/controller/updateCustomer.controller";
import { deleteCustomerController } from "../modules/staff/controller/deleteCustomer.controller";
import { getCustomerByIdController } from "../modules/staff/controller/getCustomerByDni.controller";
const router = Router();

router.post(
  "/customer/register",
  requireStaff,
  createCustomerValidator,
  registerCustomerController
);
router.patch(
  "/customer/:id",
  requireStaff,
  updateValidation,
  updateCustomerController
);

router.get("/customer/:dni", requireStaff, getCustomerByIdController);

router.delete("/customer/:id", requireStaff, deleteCustomerController);

router.post(
  "/auth/register",
  requireStaff,
  createStaffValidator,
  registerStaffController
);

router.post("/auth/login", loginValidator, LoginStaffController);

export default router;
