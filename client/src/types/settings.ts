import { SORT_FIELD, SORT_TYPE } from "./message";

export type SettingsType = {
  page: number;
  sortType: SORT_TYPE;
  sortField: SORT_FIELD;
  isNext: boolean;
};
