import { useEffect, useRef } from "react";
import { useDragOver } from "../../../../hooks/useDragOver";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  closeTab,
  setActiveTab,
  setDraggedTab,
} from "../../../../store/slices/tabsSlice";
import { TabModel } from "../../../../store/utils/tabActions";
import { ContentIdBadge } from "../../../common/contentIdBadge/contentIdBadge";
import { Styles } from "./style";
import { TabCloseButton } from "./tabCloseButton";
import { TabPinButton } from "./tabPinButton";

export function Tab({
  tab,
  onDragStart,
  onDrop,
  onContextMenu,
}: {
  tab: TabModel;
  onDragStart: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onContextMenu: (event: React.MouseEvent) => void;
}) {
  const { isDragOver, onDragLeave, onDragEnter } = useDragOver();
  const activeTab = useAppSelector(state =>
    state.tabs.tabGroups[tab.tabGroupId]?.activeTabQueue.at(-1)
  );
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (tab.id === activeTab) {
      ref.current?.scrollIntoView();
    }
  }, [activeTab]);

  function onTabDragOver(event: React.DragEvent<HTMLDivElement>): void {
    if (!draggedTab) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function onTabDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    onDragLeave(event);
    onDrop(event);
  }

  function onTabMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.button === 1) {
      dispatch(closeTab(tab));
    } else if (event.button == 0) {
      dispatch(setActiveTab(tab));
    }
  }

  return (
    <Styles.Tab
      ref={ref}
      isDragOver={draggedTab && isDragOver}
      onDragLeave={onDragLeave}
      onDragEnter={onDragEnter}
      draggable={!draggedTab}
      onDrop={onTabDrop}
      onDrag={event => {
        event.preventDefault();
        if (!draggedTab) {
          onDragStart(event);
        }
      }}
      onDragEnd={() => {
        dispatch(setDraggedTab(null));
      }}
      onDragOver={onTabDragOver}
      onContextMenu={onContextMenu}
      isActive={activeTab === tab.id}
      title={tab.tooltip}
      onMouseDown={onTabMouseDown}
    >
      <ContentIdBadge tabContentType={tab.content.type} />
      <Styles.TabLabel>{tab.label}</Styles.TabLabel>
      {tab.isPinned && (
        <TabPinButton isDragOver={draggedTab && isDragOver} tab={tab} />
      )}
      {!tab.isPinned && (
        <TabCloseButton isDragOver={draggedTab && isDragOver} tab={tab} />
      )}
    </Styles.Tab>
  );
}
