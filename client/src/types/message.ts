export type SORT_FIELD = "username" | "email" | "date" | null;
export type SORT_TYPE = 1 | -1 | null;

export type MessageType = {
  id: number;
  username: string;
  text: string;
  email: string;
  date: Date;
  homepage: string | null;
  user_ip: string;
  user_browser: string;
};

export type ResponseFindAllMessagesType = {
  message: string;
  messages: MessageType[];
  isNext: boolean;
};
