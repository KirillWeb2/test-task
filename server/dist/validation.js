import { body } from "express-validator";
export const CreateMessageValidation = [
    body("username").isString().isLength({ max: 20 }),
    body("email").isEmail().isString().isLength({ max: 30 }),
    body("text").isString().isLength({ max: 500 }),
    body("homepage").isString().isLength({ max: 100 }).optional(),
];
