import { zip } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Side } from "../../app/side";
import { Styles } from "./style";
import { TabsListItem } from "./tabsListItem";
import { TabModel } from "../../../store/utils/tabActions";
import { setActiveTab } from "../../../store/slices/tabsSlice";
import { useState } from "react";
import { Searchbox } from "../../common/searchbox/searchbox";
import { TabGroup } from "../../../store/utils/tabsGroupUtils";

export function TabsList({
  tabGroups,
  onTabClick,
}: {
  tabGroups: TabGroup[];
  onTabClick: (tab: TabModel) => void;
}) {
  const tabGroupElements = tabGroups.map(tabGroup => {
    return tabGroup.openTabs.map(tab => (
      <TabsListItem tab={tab} onClick={() => onTabClick(tab)} key={tab.id} />
    ));
  });

  const groupSeparators = Array.from(
    Array((tabGroupElements.length || 1) - 1),
    () => <Styles.TabsListLineSeparator />
  );

  const tabsAndGroupSeparators = zip(tabGroupElements, groupSeparators);

  return (
    <Styles.TabsList>
      {tabsAndGroupSeparators.length ? (
        tabsAndGroupSeparators
      ) : (
        <Styles.NoOpenTabsText>No open tabs</Styles.NoOpenTabsText>
      )}
    </Styles.TabsList>
  );
}
