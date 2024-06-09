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

export function GridItem(props: { item: GridItemModel }) {
  const dispatch = useAppDispatch();
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);

  return (
    <Styles.GridItem
      {...props}
      onAuxClick={event => {
        if (event.button === 1) {
          props.item.onClick(props.item.value);
        }
      }}
      onClick={event => {
        event.stopPropagation();
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
    >
      {props.item.label}
    </Styles.GridItem>
  );
}
