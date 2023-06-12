import { FC, useCallback } from "react";

import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { SettingsType } from "../types/settings";

export interface PaginationProps {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
}

export const Pagination: FC<PaginationProps> = ({ setSettings, settings }) => {
  let [search, setSearch] = useCustomSearchParams();

  const handleNextPage = useCallback(() => {
    setSettings({ ...settings, page: +settings.page + 1 });
    setSearch({ ...search, page: String(+settings.page + 1) });
  }, [setSettings, settings, setSearch, search]);

  const handlePrevPage = useCallback(() => {
    if (settings.page > 1) {
      setSettings({ ...settings, page: +settings.page - 1 });
      setSearch({ ...search, page: String(+settings.page - 1) });
    }
  }, [setSettings, settings, setSearch, search]);

  return (
    <div className="pagination">
      <button
        className="btn"
        disabled={+settings.page === 1}
        onClick={handlePrevPage}
      >
        Предыдущая страница
      </button>
      <div>Страница {settings.page}</div>
      <button
        className="btn"
        disabled={!settings.isNext}
        onClick={handleNextPage}
      >
        Следующая страница
      </button>
    </div>
  );
};
