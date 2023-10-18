import { Router } from "express";
import { registerHBController } from "../modules/homebanking/controller/registerHB.controller";
import { registerHBValidation } from "../middleware/ValidatorManager";
import { loginHBController } from "../modules/homebanking/controller/loginHB.controller";

const router = Router();

router.post("/auth/register", registerHBValidation, registerHBController);
router.post("/auth/login", loginHBController);

export default router;
