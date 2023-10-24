import { Router } from "express";
import { registerHBController } from "../modules/homebanking/controller/registerHB.controller";
import {
  passwordValidator,
  registerHBValidation,
  updateValidation,
} from "../middleware/ValidatorManager";
import { loginHBController } from "../modules/homebanking/controller/loginHB.controller";
import { updateUserdataController } from "../modules/homebanking/controller/updateUserdata.controller";
import requireHBAccount from "../middleware/requireHBAccount";
import requireHBSession from "../middleware/requireHBSession";
import { updatePassHCController } from "../modules/homebanking/controller/updatePassHB.controller";
import { recoverPassHCController } from "../modules/homebanking/controller/recoverPassHB.controller";
import { createAccountController } from "../modules/homebanking/controller/createAccount.controller";
import { deleteAccountController } from "../modules/homebanking/controller/deleteAccount.controller";
import { listAccountController } from "../modules/homebanking/controller/listAccount.controller";
import { createTransferenceController } from "../modules/homebanking/controller/createTransference.controller";

const router = Router();

router.post("/auth/register", registerHBValidation, registerHBController);
router.post("/auth/login", loginHBController);
router.post("/auth/session", requireHBSession);

router.post("/recover/password", recoverPassHCController);

router.patch(
  "/customer/:id",
  requireHBAccount,
  updateValidation,
  updateUserdataController
);
router.patch(
  "/password/:id",
  requireHBAccount,
  passwordValidator,
  updatePassHCController
);

router.post("/account", requireHBAccount, createAccountController);
router.delete("/account/:na", requireHBAccount, deleteAccountController);
router.get("/account/:id/list", requireHBAccount, listAccountController);

router.post("/transference", requireHBAccount, createTransferenceController);
export default router;
