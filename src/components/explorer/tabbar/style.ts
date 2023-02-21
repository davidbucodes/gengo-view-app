import styled from "styled-components";
import { colors } from "../../../theme";

interface ContextMenuProps {
  x: number;
  y: number;
}

interface DropAreaAfterTabsProps {
  isDragOver: boolean;
}

export namespace Styles {
  export const Tabbar = styled.div`
    min-height: 45px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: ${colors.backgroundDark1};
    flex-shrink: 0;
  `;

  export const DropAreaAfterTabs = styled.div<DropAreaAfterTabsProps>`
    flex-grow: 1;
    ${props =>
      props.isDragOver && `background-color: ${colors.backgroundGrey};`}
  `;

  export const ContextMenu = styled.div<ContextMenuProps>`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-color: white;
    cursor: pointer;
  `;
}
