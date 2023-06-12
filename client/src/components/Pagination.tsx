import { FC, useCallback } from "react";

import { useCustomSearchParams } from "../hooks/useCustomSearchParams";
import { useMessages } from "../hooks/useMessages";

export interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  let [search, setSearch] = useCustomSearchParams();
  const { setSettings, settings } = useMessages({ search, setSearch });

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
