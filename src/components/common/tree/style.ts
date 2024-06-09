import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Tree = styled.div`
    user-select: none;
    overflow-y: auto;
    flex-grow: 1;
    background-color: ${colors.backgroundDark1};
    font-size: ${fontSizes.mediumSmall};
    display: flex;
    flex-direction: column;
  `;

  export const TreeTopbar = styled.div`
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
  `;

  export const TreeTopbarText = styled.div`
    flex-grow: 1;
    font-weight: bold;
    font-size: ${fontSizes.small};
  `;

  export const TreeTopbarFoldAll = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
  `;

  export const TreeItems = styled.div`
    flex-grow: 1;
    overflow: auto;
  `;
}
