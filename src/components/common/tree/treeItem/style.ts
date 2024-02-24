import styled from "styled-components";
import { colors, fontSizes } from "../../../../theme";

interface TreeItemProps {
  level: number;
}

export namespace Styles {
  export const TreeItemWrapper = styled.div``;

  export const TreeItem = styled.div<TreeItemProps>`
    color: white;
    padding: 6px 10px;
    margin-left: ${props => 40 * props.level}px;
    padding-left: 15px;
    font-size: ${fontSizes.smallSubtitle};
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    ${props =>
      props.level ? `border-left: 1px solid ${colors.backgroundLight3};` : ""}

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
