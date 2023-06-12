import React, { FC, useState, useCallback } from "react";

import { Messages } from "../Messages";
import { Form } from "../Form";
import { Sorted } from "../Sorted";
import { Pagination } from "../Pagination";
import { useCustomSearchParams } from "../../hooks/useCustomSearchParams";
import { useQuery } from "react-query";
import { SettingsType } from "../../types/settings";
import { ResponseFindAllMessagesType } from "../../types/message";
import axios from "../../axios";

interface MainLayoutProps {}

export const MainLayout: FC<MainLayoutProps> = () => {
  const [search] = useCustomSearchParams();

  const [settings, setSettings] = useState<SettingsType>({
    page: search.page || 1,
    isNext: true,
    sortField: search.sortField || null,
    sortType: search.sortType || null,
  });
  const [isAddMessageForm, setIsAddMessageForm] = useState(false);

  const toggleAddMessageForm = useCallback(() => {
    setIsAddMessageForm(!isAddMessageForm);
  }, [isAddMessageForm]);

  const { data, refetch } = useQuery(
    ["findAll", settings.page, settings.sortField, settings.sortType],
    () =>
      axios
        .get<ResponseFindAllMessagesType>("/messages", {
          params: {
            page: settings.page,
            sort_type: settings.sortType,
            sort_field: settings.sortField,
          },
        })
        .then((res) => {
          setSettings((prevSettings) => ({
            ...prevSettings,
            isNext: res.data.isNext,
          }));

          return res.data;
        }),
    { refetchOnWindowFocus: false }
  );

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
        <Sorted setSettings={setSettings} settings={settings} />
        <Messages messages={data?.messages} />
        <Pagination setSettings={setSettings} settings={settings} />
      </div>
    </div>
  );
};
