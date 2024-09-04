import { ContentId } from "../../components/view/contentId";
import { generateId } from "./generateId";
import { TabGroup } from "./tabsGroupUtils";

export type ListModel = {
  id: string;
  name: string;
  creationTimestamp: number;
  updatedTimestamp: number;
  contentIds: ContentId[];
};

const allowedContentIdTypes = [
  "kanji",
  "name",
  "vocabulary",
] as ContentId["type"][];

export namespace ListUtils {
  export function createList(
    listName: string,
    contentIds: ContentId[] = []
  ): ListModel {
    const now = Date.now();
    return {
      id: generateId(),
      name: listName,
      contentIds: filterUnallowedContentIdTypes(contentIds),
      creationTimestamp: now,
      updatedTimestamp: now,
    };
  }

  export function dumpLists({ lists }: { lists: ListModel[] }): string {
    return JSON.stringify(lists);
  }

  export function readListsDump({
    listsDump,
  }: {
    listsDump: string;
  }): ListModel[] {
    return JSON.parse(listsDump);
  }

  function filterUnallowedContentIdTypes(contentIds: ContentId[]) {
    return contentIds.filter(contentId =>
      allowedContentIdTypes.includes(contentId.type)
    );
  }

  export function toggleSave(list: ListModel, contentId: ContentId) {
    if (allowedContentIdTypes.includes(contentId.type)) {
      if (!list.contentIds.some(id => id.id === contentId.id)) {
        list.contentIds.unshift(contentId);
      } else {
        list.contentIds = list.contentIds.filter(id => id.id !== contentId.id);
      }
    }
  }
}
