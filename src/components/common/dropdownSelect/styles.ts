import styled from "styled-components";
import { colors } from "../../../theme";

export namespace Styles {
  export const DropdownSelect = styled.select`
    align-self: flex-start;
    padding: 1ch;
    border-radius: 5px;
    border: 3px solid ${colors.backgroundLight4};
    background: ${colors.backgroundLight3};
    padding: 5px 7px;
    color: ${colors.white};
    font-weight: bold;
    flex-grow: 1;
    text-align: center;
  `;
  export const DropdownOption = styled.option``;
}
