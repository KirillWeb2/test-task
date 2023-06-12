import { Request, Response, Router } from "express";

import { MessagesController } from "../controllers/index.js";
import {
  CreateMessageValidation,
} from "../validation.js";
import { isValid } from "../utils/isValid.js";

export const router = Router();

router.get("/", (req: Request, res: Response) =>
  MessagesController.findAll(req, res)
);

router.post(
  "/create",
  CreateMessageValidation,
  isValid,
  (req: Request, res: Response) => MessagesController.create(req, res)
);