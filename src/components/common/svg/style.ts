import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Svg = styled.img<{ isHidden: boolean }>`
    background-color: white;
    ${props => (props.isHidden ? "display: none;" : "")}
  `;

  export const SvgLoadingError = styled.span`
    background-color: ${colors.backgroundLight3};
    font-size: ${fontSizes.small};
    border-radius: 10px;
    padding: 5px;
    max-width: 150px;
    display: inline-block;
  `;
}
