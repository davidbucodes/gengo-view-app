import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

interface ContentIdBadgeProps {
  backgroundColor: string;
}

export namespace Styles {
  export const ContentIdBadge = styled.div<ContentIdBadgeProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${colors.background};
    display: inline-block;
    width: ${fontSizes.small};
    height: ${fontSizes.small};
    font-size: ${fontSizes.small};
    line-height: ${fontSizes.small};
    margin-right: 8px;
    text-align: center;
    border-radius: 3px;
    font-weight: bold;
    flex-shrink: 0;
    pointer-events: none;
  `;
}
