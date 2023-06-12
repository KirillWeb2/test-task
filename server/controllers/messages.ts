import { Request, Response } from "express";

import { CreateMessageType, SORT_FIELD, SORT_TYPE } from "../types/message.js";
import { MessagesORM } from "../orm/Messages.js";

export const findAll = async (req: Request, res: Response) => {
  try {
    let { sort_field, sort_type, page } = req.query as {
      sort_field: SORT_FIELD;
      page: string;
      sort_type: SORT_TYPE;
    };

    await MessagesORM.findAll({
      page: +page,
      sort_field,
      sort_type,
      tableName: "messages",
    });

    res.status(200).json({
      message: "ok",
      messages: MessagesORM.messages,
      isNext: MessagesORM.isNext,
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateMessageType;

    body.date = new Date();
    console.log(body.date)
    body.user_ip = req.ip || "0.0.0.0";
    body.user_browser = req.headers["user-agent"] || "";

    await MessagesORM.create("messages", body);

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
  }
};
