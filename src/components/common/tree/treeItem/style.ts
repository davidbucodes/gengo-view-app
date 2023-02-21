import styled from "styled-components";
import { colors, fontSizes } from "../../../../theme";

interface TreeItemProps {
  level: number;
}

export namespace Styles {
  export const TreeItemWrapper = styled.div``;

  export const TreeItem = styled.div<TreeItemProps>`
    color: white;
    padding: 5px 10px;
    padding-left: ${props => 10 + 30 * props.level}px;
    font-size: ${fontSizes.smaller};
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background-color: ${colors.backgroundDark2};
    }
  `;

  export const TreeItemFoldIcon = styled.span`
    padding: 0 5px;
    display: flex;
    align-items: center;
  `;

  export const TreeItemText = styled.span``;
}
