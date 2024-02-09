import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearSelectionContextMenu } from "../../../store/slices/selectionContextMenuSlice";
import { Styles } from "./style";
import { openTab } from "../../../store/slices/tabsSlice";

export function SelectionContextMenu(): JSX.Element {
  const selectionContextMenu = useAppSelector(
    state => state.selectionContextMenu
  );
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);

  function close() {
    dispatch(clearSelectionContextMenu());
  }

  const shouldDisplay = Boolean(
    selectionContextMenu.selectedText && selectionContextMenu.position
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
      x={selectionContextMenu.position.x}
      y={selectionContextMenu.position.y}
      onContextMenu={event => event.preventDefault()}
      tabIndex={0}
      onBlur={() => close()}
      ref={inputRef}
    >
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          dispatch(
            openTab({
              type: "search",
              id: selectionContextMenu.selectedText,
              label: selectionContextMenu.selectedText,
            })
          );
        }}
      >
        Search selection
      </Styles.ContextMenuItem>
      <Styles.ContextMenuLine />
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          window.open(
            `http://google.com/search?q=${selectionContextMenu.selectedText}`
          );
        }}
      >
        Search in Google
      </Styles.ContextMenuItem>
      <Styles.ContextMenuItem
        onClick={() => {
          close();
          window.open(
            `https://translate.google.com/?sl=ja&tl=en&op=translate&text=${selectionContextMenu.selectedText}`
          );
        }}
      >
        Search in Google Translate
      </Styles.ContextMenuItem>
    </Styles.ContextMenu>
  );
}
