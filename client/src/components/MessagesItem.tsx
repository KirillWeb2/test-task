import { FC } from "react";

import { MessageType } from "../types/message";

interface MessagesItemProps {
  message: MessageType;
}

export const MessagesItem: FC<MessagesItemProps> = ({ message }) => {
  let date = String(message.date).split("T");

  date[1] = new Date(message.date).toLocaleTimeString("ru-RU");

  return (
    <div className="messages__item">
      <div className="messages__item_info">
        <h4>{message.username}</h4>
        <span>{message.email}</span>
        <p>{message.text}</p>
      </div>
      <div className="messages__item_date">
        <span>{date.join(" ")}</span>
      </div>
    </div>
  );
};
