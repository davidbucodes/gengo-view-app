import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Svg = styled.img<{ isHidden: boolean }>`
    background-color: white;
    ${props => (props.isHidden ? "display: none;" : "")}
    border-radius: 10px;
    margin: 10px;
    min-width: 140px;
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
