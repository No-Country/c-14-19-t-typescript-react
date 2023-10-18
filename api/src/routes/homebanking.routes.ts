import { Router } from "express";
import { registerHBController } from "../modules/homebanking/controller/registerHB.controller";
import {
  registerHBValidation,
  updateValidation,
} from "../middleware/ValidatorManager";
import { loginHBController } from "../modules/homebanking/controller/loginHB.controller";
import { updateUserdataController } from "../modules/homebanking/controller/updateUserdata.controller";
import requireHBAccount from "../middleware/requireHBAccount";
import requireHBSession from "../middleware/requireHBSession";

const router = Router();

router.post("/auth/register", registerHBValidation, registerHBController);
router.post("/auth/login", loginHBController);

router.post("/auth/session", requireHBSession);

router.patch(
  "/customer/:id",
  requireHBAccount,
  updateValidation,
  updateUserdataController
);
export default router;
