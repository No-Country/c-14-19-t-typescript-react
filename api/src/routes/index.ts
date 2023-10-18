import { NextFunction, Request, Response, Router } from "express";
import BadRequestException from "../exception/BadRequestException";
import staffRouter from "./staff.routes";
import homebankingRouter from "./homebanking.routes";
import UnauthorizedException from "../exception/UnauthorizedException";
import NotFoundException from "../exception/NotFoundException";

const route = Router();

route.use("/staff", staffRouter);
route.use("/homebanking", homebankingRouter);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestException) {
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof NotFoundException) {
    return res.status(404).json({ msg: err.message });
  }

  if (err instanceof UnauthorizedException) {
    return res.status(401).json({ msg: err.message });
  } else {
    return res.status(500).json({ msg: err.message });
  }
});

export default route;
