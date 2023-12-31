import { useSearchParams } from "react-router-dom";

export const useCustomSearchParams = () => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject: any = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};
