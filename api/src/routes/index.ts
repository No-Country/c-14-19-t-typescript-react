import { NextFunction, Request, Response, Router } from "express";
import BadRequestException from "../exception/BadRequestException";
import staffRouter from "./staff.routes";

const route = Router();

route.use("/staff", staffRouter);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestException) {
    return res.status(400).json({ msg: err.message });
  } else {
    return res.status(500).json({ msg: err.message });
  }
});

export default route;
