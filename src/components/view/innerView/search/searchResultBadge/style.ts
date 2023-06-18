import styled from "styled-components";
import { colors, fontSizes } from "../../../../../theme";

interface ContentIdBadgeProps {
  backgroundColor: string;
}

export namespace Styles {
  export const SearchResultBadge = styled.div<ContentIdBadgeProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${colors.background};
    display: inline-block;
    padding: 4px;
    text-align: center;
    border-radius: 3px;
    font-weight: bold;
    flex-shrink: 0;
    pointer-events: none;
    text-decoration: none !important;
    font-size: ${fontSizes.small};
  `;
}
