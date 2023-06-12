import { useQuery } from "react-query";
import { useState } from "react";

import { SettingsType } from "../types/settings";
import { ResponseFindAllMessagesType } from "../types/message";
import axios from "../axios";

interface IUseMessages {
  search: SettingsType;
  setSearch: (search: SettingsType) => void;
}

export const useMessages = ({ search }: IUseMessages) => {
  const [settings, setSettings] = useState<SettingsType>({
    page: search.page || 1,
    isNext: true,
    sortField: search.sortField || null,
    sortType: search.sortType || null,
  });

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

  return {
    data,
    settings,
    setSettings,
    refetch,
  };
};
