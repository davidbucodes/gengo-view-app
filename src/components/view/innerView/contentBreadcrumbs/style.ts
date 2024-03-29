import styled from "styled-components";
import { colors, fontSizes } from "../../../../theme";

export namespace Styles {
  export const ContentBreadcrumbs = styled.div`
    flex-grow: 1;
    border-bottom: solid ${colors.backgroundLight1} 1px;
    flex-shrink: 0;
    padding-bottom: ${fontSizes.tinier};
    margin-bottom: ${fontSizes.tiny};
    font-size: ${fontSizes.smaller};
    color: ${colors.backgroundGrey};
    overflow-x: auto;
    white-space: nowrap;
    flex-shrink: 0;
    user-select: none;
  `;
}
