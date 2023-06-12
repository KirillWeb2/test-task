import { FC } from "react";

import { MessagesItem } from "./MessagesItem";
import { MessageType } from "../types/message";

interface MessagesProps {
  messages: MessageType[] | undefined;
}

export const Messages: FC<MessagesProps> = ({ messages }) => {
  if (!messages) return <p>Ошибка</p>;

  return (
    <div className="messages">
      {messages.length === 0 && <p>Сообщений нет</p>}
      <div className="messages__list">
        {messages.map((mes) => (
          <MessagesItem key={mes.id} message={mes} />
        ))}
      </div>
    </div>
  );
};
