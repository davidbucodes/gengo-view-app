import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Button = styled.div<{ color?: string }>`
    user-select: none;
    cursor: pointer;
    appearance: none;
    background: ${colors.backgroundLight3};
    padding: 5px 7px;
    color: ${({ color }) => color || colors.white};
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    margin: 10px 5px;
    display: inline-flex;
    align-items: center;
    font-size: ${fontSizes.smallSubtitle};
    font-weight: normal;

    &:hover {
      background: ${colors.backgroundLight2};
    }
  `;
}
