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
import requireStaffSession from "../middleware/requireStaffSession";
import { createAccountCustomerController } from "../modules/staff/controller/createAccountCustomer.controller";
import { deleteAccountCustomerController } from "../modules/staff/controller/deleteAccountCustomer.controller";
import { listAccountCustomerController } from "../modules/staff/controller/listAccoutCustomer.controller";
import { listStaffController } from "../modules/staff/controller/listStaff.controller";
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

router.post("/customer/account", requireStaff, createAccountCustomerController);
router.delete(
  "/customer/account/:na",
  requireStaff,
  deleteAccountCustomerController
);

router.get(
  "/customer/account/:id/list",
  requireStaff,
  listAccountCustomerController
);

router.post(
  "/auth/register",
  requireStaff,
  createStaffValidator,
  registerStaffController
);

router.get("/", requireStaff, listStaffController);

router.post("/auth/login", loginValidator, LoginStaffController);

router.post("/auth/session", requireStaffSession);

export default router;
