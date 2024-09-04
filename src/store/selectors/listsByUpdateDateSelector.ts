import { ListModel } from "../utils/listUtils";
import { sortBy } from "lodash";
import { RootState } from "../store";

export function listsByUpdateDateSelector(state: RootState): ListModel[] {
  return sortListsByUpdateDate(state.lists.savedLists);
}

export function sortListsByUpdateDate(lists: ListModel[]): ListModel[] {
  return sortBy(lists, function (list) {
    return -list.updatedTimestamp;
  });
}
