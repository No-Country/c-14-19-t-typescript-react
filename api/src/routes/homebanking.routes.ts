import { Router } from "express";
import { registerHBController } from "../modules/homebanking/controller/registerHB.controller";
import { registerHBValidation } from "../middleware/ValidatorManager";

const router = Router();

router.post("/auth/register", registerHBValidation, registerHBController);

export default router;
