import styled from "styled-components";
import { colors, fontSizes } from "../../../../theme";

export namespace Styles {
  export const ContentBreadcrumbs = styled.div`
    flex-grow: 1;
    border-bottom: solid transparent 10px;
    padding-bottom: ${fontSizes.tiny};
    font-size: ${fontSizes.smaller};
    color: ${colors.backgroundGrey};
    overflow-x: auto;
    white-space: nowrap;
    flex-shrink: 0;
    user-select: none;
  `;
}
