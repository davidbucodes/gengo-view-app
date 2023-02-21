import styled from "styled-components";
import { colors, fontSizes } from "../../theme";

export namespace Styles {
  export const Explorer = styled.div`
    flex-grow: 1;
    overflow-y: hidden;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  `;

  export const EmptyTabGroupsGrid = styled.div<{ isTabDraggedOver: boolean }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: ${fontSizes.tiny};
    align-items: center;
    justify-content: center;
    ${props =>
      !props.isTabDraggedOver
        ? ""
        : `background-color: ${colors.backgroundLight1};`}
  `;

  export const EmptyTabGroupsGridHeader = styled.div`
    text-align: center;
    color: ${colors.backgroundGrey};
    font-size: ${fontSizes.giant};
    font-weight: bold;
  `;

  export const EmptyTabGroupsGridText = styled.div`
    text-align: center;
    color: ${colors.backgroundGrey};
    font-size: ${fontSizes.medium};
  `;
}
