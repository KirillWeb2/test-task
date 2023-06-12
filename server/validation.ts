import { body } from "express-validator";

export const CreateMessageValidation = [
  body("username")
    .matches(/^[a-zA-Z0-9]+$/)
    .isString(),
  body("email").isEmail().isString(),
  body("text")
    .matches(/^[^<>\n]+$/gm)
    .isString(),
  body("homepage").isString().optional(),
];
