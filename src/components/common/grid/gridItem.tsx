import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDraggedContent } from "../../../store/slices/tabsSlice";
import { ContentId } from "../../view/contentId";
import { Styles } from "./style";

export interface GridItemModel {
  label: string;
  value: ContentId | string;
  onClick: (value: ContentId | string) => void;
  onDragStart: (value: ContentId | string) => void;
  tooltip?: string;
  separator?: boolean;
}

function getCenterOffset(element: HTMLElement) {
  return element.offsetLeft + element.offsetWidth / 2;
}

export function GridItem(props: { item: GridItemModel }) {
  const ref = useRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.focus();
  //   }
  // }, [ref.current]);

  return (
    <Styles.GridItem
      ref={ref}
      {...props}
      onAuxClick={event => {
        if (event.button === 1) {
          props.item.onClick(props.item.value);
        }
      }}
      onClick={event => {
        event.stopPropagation();
        event.currentTarget.focus();
        props.item.onClick(props.item.value);
      }}
      key={props.item.label}
      onDrag={event => {
        event.preventDefault();
        if (!draggedTab) {
          props.item.onDragStart(props.item.value);
        }
      }}
      onDragEnd={() => {
        dispatch(setDraggedContent(null));
      }}
      onDragOver={event => {
        event.preventDefault();
        return;
      }}
      draggable={!draggedTab}
      isTabDragged={Boolean(draggedTab)}
      data-tooltip={props.item.tooltip}
      data-separator={props.item.separator}
      tabIndex={2}
      onKeyDown={function (event) {
        if (!ref.current) {
          return;
        }
        try {
          switch (event.key) {
            case "ArrowUp": {
              event.preventDefault();

              let prevLineLastItem = ref.current
                .previousElementSibling as HTMLElement;

              while (prevLineLastItem.offsetTop === ref.current.offsetTop) {
                prevLineLastItem =
                  prevLineLastItem.previousElementSibling as HTMLElement;
              }

              let prevLineTopItem = prevLineLastItem;
              while (
                (prevLineLastItem.previousElementSibling as HTMLElement)
                  .offsetTop === prevLineLastItem.offsetTop &&
                getCenterOffset(
                  prevLineTopItem.previousElementSibling as HTMLElement
                ) >= getCenterOffset(ref.current)
              ) {
                prevLineTopItem =
                  prevLineTopItem.previousElementSibling as HTMLElement;
              }

              prevLineTopItem.focus();
              break;
            }
            case "ArrowDown": {
              event.preventDefault();

              let nextLineLastItem = ref.current
                .nextElementSibling as HTMLElement;
              while (nextLineLastItem.offsetTop === ref.current.offsetTop) {
                nextLineLastItem =
                  nextLineLastItem.nextElementSibling as HTMLElement;
              }

              let nextLineTopItem = nextLineLastItem;
              while (
                (nextLineTopItem.nextElementSibling as HTMLElement)
                  .offsetTop === nextLineLastItem.offsetTop &&
                getCenterOffset(
                  nextLineTopItem.nextElementSibling as HTMLElement
                ) <= getCenterOffset(ref.current)
              ) {
                nextLineTopItem =
                  nextLineTopItem.nextElementSibling as HTMLElement;
              }

              nextLineTopItem.focus();
              break;
            }
            case "ArrowRight": {
              event.preventDefault();

              (ref.current.nextElementSibling as HTMLElement).focus();
              break;
            }
            case "ArrowLeft": {
              event.preventDefault();

              (ref.current.previousElementSibling as HTMLElement).focus();
              break;
            }
          }
        } catch (e) {}
      }}
    >
      {props.item.label}
    </Styles.GridItem>
  );
}
