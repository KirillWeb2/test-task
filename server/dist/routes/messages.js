import { Router } from "express";
import { MessagesController } from "../controllers/index.js";
import { CreateMessageValidation, } from "../validation.js";
import { isValid } from "../utils/isValid.js";
export const router = Router();
router.get("/", (req, res) => MessagesController.findAll(req, res));
router.post("/create", CreateMessageValidation, isValid, (req, res) => MessagesController.create(req, res));
