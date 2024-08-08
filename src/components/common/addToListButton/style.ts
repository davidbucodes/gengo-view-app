import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Button = styled.button`
    user-select: none;
    cursor: pointer;
    display: inline-flex;
    border-radius: 50%;
    border: 2px solid ${colors.white};
    width: ${fontSizes.mediumSmall};
    height: ${fontSizes.mediumSmall};
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0;
    vertical-align: middle;
    margin-top: -4px;
    flex-shrink: 0;
  `;
}
