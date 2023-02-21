import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import {
  GroupsDisplaySide,
  TabsGroupTuple,
} from "../../../store/utils/tabsGroupTupleUtils";
import { Styles } from "./style";
import { TabsGroup } from "./tabsGroup";

export function TabsGroupGrid<T>({
  tabGroupTuple,
  onOpenGroup,
}: {
  tabGroupTuple: TabsGroupTuple;
  onOpenGroup({
    groupId,
    groupIdToOpen,
    side,
  }: {
    groupId: string;
    groupIdToOpen: string;
    side: GroupsDisplaySide;
  }): void;
}) {
  const tabGroups = useAppSelector(state => state.tabs.tabGroups);

  const [isDividerDrag, setIsDividerDrag] = useState(false);
  const [firstPercentageSize, setFirstPercentageSize] = useState(50);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;

    const viewWidth = currentTarget.offsetWidth;
    const viewHeight = currentTarget.offsetHeight;
    const viewLeft = (currentTarget.offsetParent as HTMLElement).offsetLeft;
    const viewTop = (currentTarget.offsetParent as HTMLElement).offsetTop;

    if (tabGroupTuple.side === "bottom" || tabGroupTuple.side === "top") {
      let heightPercentages = Math.round(
        ((clientY - viewTop) / viewHeight) * 100
      );
      heightPercentages = Math.max(heightPercentages, 20);
      heightPercentages = Math.min(heightPercentages, 80);

      setFirstPercentageSize(heightPercentages);
    } else if (
      tabGroupTuple.side === "left" ||
      tabGroupTuple.side === "right"
    ) {
      let widthPercentages = Math.round(
        ((clientX - viewLeft) / viewWidth) * 100
      );
      widthPercentages = Math.max(widthPercentages, 20);
      widthPercentages = Math.min(widthPercentages, 80);
      setFirstPercentageSize(widthPercentages);
    }
  };

  let first: JSX.Element;
  if (typeof tabGroupTuple.first === "string") {
    if (tabGroups[tabGroupTuple.first]) {
      first = (
        <TabsGroup tabGroupId={tabGroupTuple.first} onOpenGroup={onOpenGroup} />
      );
    }
  } else if (tabGroupTuple.first) {
    first = (
      <TabsGroupGrid
        tabGroupTuple={tabGroupTuple.first}
        onOpenGroup={onOpenGroup}
      />
    );
  }

  let second: JSX.Element;
  if (tabGroupTuple.second) {
    second = (
      <TabsGroupGrid
        tabGroupTuple={tabGroupTuple.second}
        onOpenGroup={onOpenGroup}
      />
    );
  }

  return (
    <Styles.TabsGroupGridWrapper
      side={tabGroupTuple.side}
      isDividerDrag={isDividerDrag}
    >
      {first && (
        <Styles.TabsGroupGrid
          side={tabGroupTuple.side}
          percentageSize={firstPercentageSize}
        >
          {first}
        </Styles.TabsGroupGrid>
      )}
      {first && second && (
        <Styles.TabGroupWrapperDivider
          side={tabGroupTuple.side}
          isDividerDrag={isDividerDrag}
          onMouseDown={() => setIsDividerDrag(true)}
        />
      )}
      {isDividerDrag && (
        <Styles.TabGroupWrapperDividerDragArea
          side={tabGroupTuple.side}
          onMouseLeave={() => {
            setIsDividerDrag(false);
          }}
          onMouseMove={onMouseMove}
          onMouseUp={() => {
            setIsDividerDrag(false);
          }}
        />
      )}
      {second && (
        <Styles.TabsGroupGrid
          side={tabGroupTuple.side}
          percentageSize={100 - firstPercentageSize}
        >
          {second}
        </Styles.TabsGroupGrid>
      )}
    </Styles.TabsGroupGridWrapper>
  );
}
