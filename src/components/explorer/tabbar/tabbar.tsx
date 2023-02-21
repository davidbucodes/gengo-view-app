import { useDragOver } from "../../../hooks/useDragOver";
import { useHorizontalScroll } from "../../../hooks/useHorizontalScroll";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setContextMenu } from "../../../store/slices/contextMenuSlice";
import { setActiveTab } from "../../../store/slices/tabsSlice";
import { TabModel } from "../../../store/utils/tabActions";
import { Styles } from "./style";
import { Tab } from "./tab/tab";

export function Tabbar({
  tabGroupId,
  onTabDragStart,
  onTabDrop,
  onTabDropOnEmptyArea,
}: {
  tabGroupId: string;
  onTabDragStart: (tab: TabModel) => void;
  onTabDrop: (tab?: TabModel) => void;
  onTabDropOnEmptyArea: () => void;
}) {
  const dispatch = useAppDispatch();
  const tabGroup = useAppSelector(state => state.tabs.tabGroups[tabGroupId]);
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);

  const scrollRef = useHorizontalScroll();

  const { isDragOver, onDragLeave, onDragEnter } = useDragOver();

  function onContextMenu(
    ev: React.MouseEvent,
    tab: (typeof tabGroup.openTabs)[number]
  ): void {
    ev.preventDefault();
    dispatch(
      setContextMenu({ position: { x: ev.clientX, y: ev.clientY }, tab })
    );
  }

  return (
    <Styles.Tabbar ref={scrollRef}>
      {tabGroup.openTabs.map(tab => (
        <Tab
          key={tab.id}
          tab={tab}
          onDragStart={() => {
            onTabDragStart(tab);
          }}
          onDrop={() => {
            onTabDrop(tab);
          }}
          onContextMenu={event => onContextMenu(event, tab)}
        />
      ))}
      <Styles.DropAreaAfterTabs
        onDrop={event => {
          onDragLeave(event);
          onTabDropOnEmptyArea();
        }}
        onClick={() => {
          dispatch(
            setActiveTab(
              tabGroup.openTabs.find(
                tab => tab.id === tabGroup.activeTabQueue.at(-1)
              )
            )
          );
        }}
        isDragOver={draggedTab && isDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragOver={event => {
          if (!draggedTab) {
            return;
          }
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
        }}
        onContextMenu={event => event.preventDefault()}
      ></Styles.DropAreaAfterTabs>
    </Styles.Tabbar>
  );
}
