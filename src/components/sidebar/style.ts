import styled from "styled-components";
import { colors } from "../../theme";

interface WidthResizeLineProps {
  lineLeft?: number;
  maxLineLeft?: number;
  minLineLeft?: number;
}

interface SidebarProps {
  width?: number;
  displayNone?: boolean;
  side?: "right" | "left";
}

export namespace Styles {
  export const Sidebar = styled.div<SidebarProps>`
    display: ${props => (props.displayNone ? "none" : "flex")};
    min-width: ${props => props.width || 200}px;
    flex-basis: ${props => props.width || 200}px;
    overflow-y: auto;
  `;

  export const WidthResizeLinePlaceholder = styled.div`
    width: 5px;
    min-width: 5px;
    height: 100%;
    background-color: ${colors.backgroundLight1};
  `;

  export const WidthResizeLine = styled.div.attrs<WidthResizeLineProps>(
    props => ({
      style: props.lineLeft
        ? {
            left: `${props.lineLeft}px`,
            backgroundColor: colors.blue,
            pointerEvents: "none",
            position: "absolute",
          }
        : {},
    })
  )<WidthResizeLineProps>`
    width: 5px;
    min-width: 5px;
    height: 100%;
    cursor: ew-resize;
    background-color: ${colors.backgroundLight1};

    &:hover {
      background-color: ${colors.blue};
    }
  `;

  export const ResizeArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: ew-resize;
    z-index: 1;
  `;
}
