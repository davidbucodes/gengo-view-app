import { Argument } from "webpack";
import { ListModel } from "../utils/listUtils";
import { useAppSelector } from "../hooks";
import { sortBy } from "lodash";

export function listsByUpdateDateSelector(
  state: Parameters<Parameters<typeof useAppSelector>[0]>[0]
): ListModel[] {
  return sortBy(state.lists.savedLists, function (list) {
    return -list.updatedTimestamp;
  });
}
