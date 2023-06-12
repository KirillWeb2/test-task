export type SORT_FIELD = "date" | "username" | "email" | null;
export type SORT_TYPE = "1" | "-1" | null;

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

export type CreateMessageType = Omit<MessageType, "id">;
export type UpdateMessageType = Omit<Partial<MessageType>, "id">;

export type MessagesQueryType = {
  sql: string;
  args?: any;
};

export type MessagesFindAllType = {
  tableName: string;
  sort_field: SORT_FIELD;
  sort_type: SORT_TYPE;
  page: number;
};

export type MessagesSplitPageType = {
  page: number;
};

export type MessagesSortType = {
  field: SORT_FIELD;
  type: SORT_TYPE;
};
