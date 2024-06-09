import {
  Database,
  IndexSearchResult,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { mean } from "lodash";

export function sortKanjis(
  kanjis: IndexSearchResult<KanjiDocument>[],
  sortBy: "jlpt" | "strokesCount" = "strokesCount"
) {
  if (sortBy === "strokesCount") {
    return kanjis.sort((a, b) => mean(a.strokeCount) - mean(b.strokeCount));
  } else {
    return kanjis.sort((a, b) => (b.jlpt || 0) - (a.jlpt || 0));
  }
}

export async function getAllKanjisSorted(
  sortBy: "jlpt" | "strokesCount" = "strokesCount"
) {
  const allKanjis = await Database.indices.kanjiIndex.searchText("");
  return sortKanjis(allKanjis, sortBy);
}
