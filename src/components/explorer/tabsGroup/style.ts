import styled from "styled-components";
import { GroupsDisplaySide } from "../../../store/utils/tabsGroupTupleUtils";
import { colors } from "../../../theme";

interface TabGroupWrapperDividerProps
  extends TabGroupWrapperDividerDragAreaProps {
  isDividerDrag: boolean;
}

interface TabGroupWrapperDividerDragAreaProps {
  side: GroupsDisplaySide;
}

interface TabsGroupGridWrapperProps
  extends TabGroupWrapperDividerDragAreaProps {
  isDividerDrag: boolean;
}

export namespace Styles {
  export const TabsGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
  `;
  export const ViewWrapper = styled.div`
    position: relative;
    min-height: 0;
    min-width: 0;
    flex-grow: 1;
    display: flex;
  `;
  export const DragAreaWrapper = styled.div`
    position: relative;
    display: flex;
    min-height: 0;
    min-width: 0;
    flex-grow: 1;
  `;

  export const TabGroupWrapperDivider = styled.div.attrs<TabGroupWrapperDividerProps>(
    props => {
      switch (props.side) {
        case "top":
        case "bottom":
          return {
            style: {
              height: "5px",
              minHeight: "5px",
              width: "100%",
              cursor: "s-resize",
            },
          };
        case "right":
        case "left":
          return {
            style: {
              width: "5px",
              minWidth: "5px",
              height: "100%",
              cursor: "ew-resize",
            },
          };
      }
    }
  )<TabGroupWrapperDividerProps>`
    background-color: ${props =>
      props.isDividerDrag ? colors.blue : colors.backgroundLight1};
    &:hover {
      background-color: ${colors.blue};
    }
  `;

  export const TabGroupWrapperDividerDragArea = styled.div.attrs<TabGroupWrapperDividerDragAreaProps>(
    props => {
      switch (props.side) {
        case "top":
        case "bottom":
          return {
            style: {
              cursor: "s-resize",
            },
          };
        case "right":
        case "left":
          return {
            style: {
              cursor: "ew-resize",
            },
          };
      }
    }
  )<TabGroupWrapperDividerDragAreaProps>`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
    z-index: 2;
    background-color: ${colors.backgroundLight1};
  `;

  export const TabsGroupGridWrapper = styled.div<TabsGroupGridWrapperProps>`
    flex-grow: 1;
    display: flex;
    min-height: 0;
    min-width: 0;
    ${props => (props.isDividerDrag ? "position: relative;" : "")}
    flex-direction: ${props => {
      switch (props.side) {
        case "top":
          return "column-reverse";
        case "bottom":
          return "column";
        case "right":
          return "row";
        case "left":
          return "row-reverse";
      }
    }};
  `;

  interface TabsGroupGridProps {
    side: GroupsDisplaySide;
    percentageSize: number;
  }

  export const TabsGroupGrid = styled.div.attrs<TabsGroupGridProps>(props => {
    switch (props.side) {
      case "top":
        return {
          style: {
            height: `${100 - props.percentageSize}%`,
          },
        };
      case "bottom":
        return {
          style: {
            height: `${props.percentageSize}%`,
          },
        };
      case "right":
        return {
          style: {
            width: `${props.percentageSize}%`,
          },
        };
      case "left":
        return {
          style: {
            width: `${100 - props.percentageSize}%`,
          },
        };
    }
  })<TabsGroupGridProps>`
    flex-grow: 1;
    display: flex;
    min-height: 0;
    min-width: 0;
  `;

  export const ViewDropAreaRight = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: ${colors.backgroundLight1};
    opacity: 0.5;
  `;
  export const ViewDropAreaLeft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: ${colors.backgroundLight1};
    opacity: 0.5;
  `;
  export const ViewDropAreaTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: ${colors.backgroundLight1};
    opacity: 0.5;
  `;
  export const ViewDropAreaBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: ${colors.backgroundLight1};
    opacity: 0.5;
  `;
  export const ViewDropAreaAll = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.backgroundLight1};
    opacity: 0.5;
  `;
}
