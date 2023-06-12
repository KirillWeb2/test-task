import React, { FC, useState, useCallback, useMemo } from "react";

import { Messages } from "../Messages";
import { Form } from "../Form";
import { Sorted } from "../Sorted";
import { Pagination } from "../Pagination";
import { useMessages } from "../../hooks/useMessages";
import { useCustomSearchParams } from "../../hooks/useCustomSearchParams";

interface MainLayoutProps {}

export const MainLayout: FC<MainLayoutProps> = () => {
  const [search, setSearch] = useCustomSearchParams();

  const { refetch, data } = useMessages({ search, setSearch });

  const [isAddMessageForm, setIsAddMessageForm] = useState(false);

  const toggleAddMessageForm = useCallback(() => {
    setIsAddMessageForm(!isAddMessageForm);
  }, [isAddMessageForm]);

  return (
    <div className="main__layout">
      {isAddMessageForm ? (
        <Form refetch={refetch} toggleAddMessageForm={toggleAddMessageForm} />
      ) : (
        <button className="btn main__layout_btn" onClick={toggleAddMessageForm}>
          Добавить сообщение
        </button>
      )}
      <div className="main__layout_content">
        <Sorted />
        <Messages messages={data?.messages} />
        <Pagination />
      </div>
    </div>
  );
};
