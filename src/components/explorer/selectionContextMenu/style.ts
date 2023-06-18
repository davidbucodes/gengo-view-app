import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

interface ContextMenuProps {
  x: number;
  y: number;
}

interface DropAreaAfterTabsProps {
  isDragOver: boolean;
}

export namespace Styles {
  export const ContextMenu = styled.div<ContextMenuProps>`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    cursor: pointer;
    outline: ${colors.backgroundLight4} 1px solid;
    outline-offset: 0;
    background-color: ${colors.backgroundDark2};
    border-radius: 5px;
    z-index: 2000;
  `;

  export const ContextMenuItem = styled.div`
    height: ${fontSizes.smaller};
    font-size: ${fontSizes.smaller};
    line-height: ${fontSizes.smaller};
    color: white;
    padding: 8px 10px;

    &:hover {
      background-color: ${colors.background};
    }
  `;

  export const ContextMenuLine = styled.div`
    height: 1px;
    background-color: ${colors.backgroundGrey};
  `;
}
