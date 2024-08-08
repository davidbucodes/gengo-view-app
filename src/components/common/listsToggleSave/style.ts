import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const ListsSelectInline = styled.div`
    padding: 5px;
    user-select: none;
    display: flex;
    border-radius: 10px;
    border: 2px solid ${colors.backgroundGrey};
    background-color: transparent;
    margin-bottom: 20px;
    vertical-align: middle;
    flex-shrink: 0;
    flex-grow: 1;
    flex-wrap: wrap;
  `;

  export const ListsSelect = styled.div`
    padding: 5px;
    user-select: none;
    display: flex;
    border-radius: 10px;
    border: 2px solid ${colors.backgroundGrey};
    background-color: transparent;
    margin-bottom: 20px;
    vertical-align: middle;
    flex-shrink: 0;
    flex-grow: 1;
    flex-wrap: wrap;
  `;
}
