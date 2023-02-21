import { TabGroup } from "./tabsGroupUtils";

export type GroupsDisplaySide = "right" | "left" | "top" | "bottom";

export type TabsGroupTuple = {
  first?: string | TabsGroupTuple;
  second?: TabsGroupTuple;
  side?: GroupsDisplaySide;
};

export namespace TabsGroupTupleUtils {
  export function cleanTuple(
    tuple: TabsGroupTuple,
    tabGroups: Record<string, TabGroup>
  ): TabsGroupTuple {
    if (!tuple) {
      return;
    }

    let cleanedFirst: string | TabsGroupTuple;
    if (typeof tuple.first === "string") {
      cleanedFirst = tabGroups[tuple.first] ? tuple.first : null;
    } else if (tuple.first !== null) {
      cleanedFirst = cleanTuple(tuple.first, tabGroups);
    }

    let cleanedSecond: TabsGroupTuple;
    if (tuple.second !== null) {
      cleanedSecond = cleanTuple(tuple.second, tabGroups);
    }

    if (!cleanedFirst) {
      cleanedFirst = cleanedSecond;
      cleanedSecond = null;
    }

    if (!cleanedFirst) {
      return null;
    }

    return {
      first: cleanedFirst,
      second: cleanedSecond,
      side: cleanedFirst && cleanedSecond ? tuple.side : null,
    };
  }

  export function openTabGroupAtTuple({
    rootTuple,
    groupId,
    groupIdToOpen,
    side,
  }: {
    rootTuple: TabsGroupTuple;
    groupId: string;
    groupIdToOpen: string;
    side: GroupsDisplaySide;
  }): TabsGroupTuple {
    if (typeof rootTuple.first === "string") {
      if (rootTuple.first === groupId) {
        return {
          first: { first: rootTuple.first },
          second: { first: groupIdToOpen },
          side,
        };
      }
      return rootTuple;
    }

    return {
      first:
        rootTuple.first &&
        openTabGroupAtTuple({
          rootTuple: rootTuple.first,
          groupId,
          groupIdToOpen,
          side,
        }),
      second:
        rootTuple.second &&
        openTabGroupAtTuple({
          rootTuple: rootTuple.second,
          groupId,
          groupIdToOpen,
          side,
        }),
      side: rootTuple.side,
    };
  }
}
