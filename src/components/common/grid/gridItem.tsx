import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDraggedContent } from "../../../store/slices/tabsSlice";
import { ContentId } from "../../view/contentId";
import { Styles } from "./style";

export interface GridItemModel {
  label: string;
  contentId: ContentId;
  onClick: (contentId: ContentId) => void;
  onDragStart: (contentId: ContentId) => void;
  tooltip: string;
}

export function GridItem(props: { item: GridItemModel }) {
  const dispatch = useAppDispatch();
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);

  return (
    <Styles.GridItem
      {...props}
      onAuxClick={event => {
        if (event.button === 1) {
          props.item.onClick(props.item.contentId);
        }
      }}
      onClick={event => {
        event.stopPropagation();
        props.item.onClick(props.item.contentId);
      }}
      key={props.item.label}
      onDrag={event => {
        event.preventDefault();
        if (!draggedTab) {
          props.item.onDragStart(props.item.contentId);
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
    >
      {props.item.label}
    </Styles.GridItem>
  );
}
