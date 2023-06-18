import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { clearTabContextMenu } from "../../../../store/slices/tabContextMenuSlice";
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
  const tabContextMenu = useAppSelector(state => state.tabContextMenu);
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);

  function close() {
    dispatch(clearTabContextMenu());
  }

  const shouldDisplay = Boolean(
    tabContextMenu.clickedTab && tabContextMenu.position
  );

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
      x={tabContextMenu.position.x}
      y={tabContextMenu.position.y}
      onContextMenu={event => event.preventDefault()}
      tabIndex={0}
      onBlur={() => close()}
      ref={inputRef}
    >
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTab(tabContextMenu.clickedTab));
        }}
      >
        Close tab
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeOtherTabs(tabContextMenu.clickedTab));
        }}
      >
        Close other tabs
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTabsToTheLeft(tabContextMenu.clickedTab));
        }}
      >
        Close tabs to the left
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeTabsToTheRight(tabContextMenu.clickedTab));
        }}
      >
        Close tabs to the right
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(closeAllTabsOfGroup(tabContextMenu.clickedTab));
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
        Close all tab groups
      </Styles.ContextMenuItem>
      {navigator.clipboard.writeText && (
        <>
          <Styles.ContextMenuLine />
          <Styles.ContextMenuItem
            onClick={() => {
              close();
              navigator.clipboard.writeText(
                tabContextMenu.clickedTab.content.label
              );
            }}
          >
            Copy tab name
          </Styles.ContextMenuItem>
        </>
      )}
      <Styles.ContextMenuLine />
      {!tabContextMenu.clickedTab.isPinned && (
        <Styles.ContextMenuItem
          onClick={() => {
            close();
            dispatch(
              setTabPinnedState({
                tab: tabContextMenu.clickedTab,
                isPinned: true,
              })
            );
          }}
        >
          Pin tab
        </Styles.ContextMenuItem>
      )}
      {tabContextMenu.clickedTab.isPinned && (
        <Styles.ContextMenuItem
          onClick={() => {
            close();
            dispatch(
              setTabPinnedState({
                tab: tabContextMenu.clickedTab,
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
