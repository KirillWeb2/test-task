import { FC, useCallback, ChangeEvent } from "react";

import { SORT_FIELD, SORT_TYPE } from "../types/message";
import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useMessages } from "../hooks/useMessages";

interface SortedProps {}

export const Sorted: FC<SortedProps> = () => {
  const [search, setSearch] = useCustomSearchParams();
  const { setSettings, settings } = useMessages({ search, setSearch });

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSettings({
        ...settings,
        sortField: e.target.value as SORT_FIELD,
        page: 1,
      });

      setSearch({
        ...search,
        sortField: e.target.value,
        page: "1",
      });
    },
    [setSettings, settings, setSearch, search]
  );

  const handleChangeType = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSettings({
        ...settings,
        sortType: +e.target.value as SORT_TYPE,
        page: 1,
      });

      setSearch({
        ...search,
        sortType: String(+e.target.value),
        page: "1",
      });
    },
    [setSettings, settings, setSearch, search]
  );

  return (
    <div className="sorted">
      <select value={settings.sortField || ""} onChange={handleChangeField}>
        <option value="null">Сортировать по полю</option>
        <option value="username">Имени</option>
        <option value="email">Email</option>
        <option value="date">Дате</option>
      </select>
      <select
        value={settings.sortType || ""}
        disabled={!settings.sortField}
        onChange={handleChangeType}
      >
        <option value="null">Сортировать по</option>
        <option value="1">Возрастанию</option>
        <option value="-1">Убыванию</option>
      </select>
    </div>
  );
};
