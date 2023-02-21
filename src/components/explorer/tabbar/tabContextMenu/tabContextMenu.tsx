import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { clearContextMenu } from "../../../../store/slices/contextMenuSlice";
import {
  closeAllGroups,
  closeAllTabsOfGroup,
  closeOtherTabs,
  closeTab,
  closeTabsToTheLeft,
  closeTabsToTheRight,
  setTabPinnedState,
} from "../../../../store/slices/tabsSlice";
import { Styles } from "./style";

export function TabContextMenu(): JSX.Element {
  const contextMenu = useAppSelector(state => state.contextMenu);
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);

  function close() {
    dispatch(clearContextMenu());
  }

  const shouldDisplay = Boolean(contextMenu.clickedTab && contextMenu.position);

  useEffect(() => {
    if (shouldDisplay) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  }, [shouldDisplay]);

  if (!shouldDisplay) {
    return;
  }

  return (
    <Styles.ContextMenu
      x={contextMenu.position.x}
      y={contextMenu.position.y}
      onContextMenu={event => event.preventDefault()}
      tabIndex={0}
      onBlur={() => close()}
      ref={inputRef}
    >
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTab(contextMenu.clickedTab));
        }}
      >
        Close tab
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeOtherTabs(contextMenu.clickedTab));
        }}
      >
        Close other tabs
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTabsToTheLeft(contextMenu.clickedTab));
        }}
      >
        Close tabs to the left
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTabsToTheRight(contextMenu.clickedTab));
        }}
      >
        Close tabs to the right
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeAllTabsOfGroup(contextMenu.clickedTab));
        }}
      >
        Close all tabs of group
      </Styles.ContextMenuItem>
      <Styles.ContextMenuLine />
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeAllGroups());
        }}
      >
        Close all groups
      </Styles.ContextMenuItem>
      {navigator.clipboard.writeText && (
        <>
          <Styles.ContextMenuLine />
          <Styles.ContextMenuItem
            onClick={() => {
              close();
              navigator.clipboard.writeText(
                contextMenu.clickedTab.content.label
              );
            }}
          >
            Copy tab name
          </Styles.ContextMenuItem>
        </>
      )}
      <Styles.ContextMenuLine />
      {!contextMenu.clickedTab.isPinned && (
        <Styles.ContextMenuItem
          onClick={() => {
            close();
            dispatch(
              setTabPinnedState({ tab: contextMenu.clickedTab, isPinned: true })
            );
          }}
        >
          Pin tab
        </Styles.ContextMenuItem>
      )}
      {contextMenu.clickedTab.isPinned && (
        <Styles.ContextMenuItem
          onClick={() => {
            close();
            dispatch(
              setTabPinnedState({
                tab: contextMenu.clickedTab,
                isPinned: false,
              })
            );
          }}
        >
          Unpin tab
        </Styles.ContextMenuItem>
      )}
    </Styles.ContextMenu>
  );
}
