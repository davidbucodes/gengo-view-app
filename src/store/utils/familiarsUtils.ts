import { ContentId } from "../../components/view/contentId";
import { generateId } from "./generateId";
import { TabGroup } from "./tabsGroupUtils";

export type SavedFamiliars = Record<string, ContentId>;

const allowedContentIdTypes = [
  "kanji",
  "name",
  "vocabulary",
] as ContentId["type"][];

export namespace FamiliarsUtils {
  export function dumpFamiliars({
    familiars,
  }: {
    familiars: SavedFamiliars;
  }): string {
    return JSON.stringify(familiars);
  }

  export function readFamiliarsDump({
    familiarsDump,
  }: {
    familiarsDump: string;
  }): SavedFamiliars {
    return JSON.parse(familiarsDump);
  }

  export function toggleSave(familiars: SavedFamiliars, contentId: ContentId) {
    if (allowedContentIdTypes.includes(contentId.type)) {
      const isFamiliar = Boolean(familiars[contentId.id]);
      if (isFamiliar) {
        delete familiars[contentId.id];
      } else {
        familiars[contentId.id] = contentId;
      }
    }
  }
}
