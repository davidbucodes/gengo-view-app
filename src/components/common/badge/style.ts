import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

interface ContentIdBadgeProps {
  backgroundColor: string;
}

export namespace Styles {
  export const Badge = styled.div<ContentIdBadgeProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${colors.background};
    display: inline-block;
    height: ${fontSizes.small};
    font-size: ${fontSizes.small};
    line-height: ${fontSizes.small};
    margin-left: 8px;
    text-align: center;
    border-radius: 3px;
    font-weight: bold;
    flex-shrink: 0;
    pointer-events: none;
    padding: 2px;
  `;
}
