import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

interface SidebarDisplayToggleBadgeProps {
  side: "right" | "left";
}

type SidebarDisplayToggleBadgeSideProps = SidebarDisplayToggleBadgeProps & {
  isSidebarDisplayed: boolean;
};

export namespace Styles {
  export const SearchbarRightMenu = styled.div`
    align-items: center;
    display: flex;
    justify-content: right;
    margin-right: 10px;
  `;

  export const SidebarDisplayToggleBadge = styled.div<SidebarDisplayToggleBadgeProps>`
    flex-grow: 1;
    border: 2px solid ${colors.backgroundGrey};
    width: 13px;
    height: 12px;
    border-radius: 4px;
    display: flex;
    justify-content: ${props => props.side};
    position: relative;
  `;

  export const SidebarDisplayToggleBadgeSide = styled.div<SidebarDisplayToggleBadgeSideProps>`
    border-right: 1px solid ${colors.backgroundGrey};
    border-left: 1px solid ${colors.backgroundGrey};
    width: 3px;
    min-width: 3px;
    flex-basis: 3px;
    height: 13px;
    position: absolute;
    ${props => props.side}: -1px;
    ${props =>
      props.isSidebarDisplayed && "background-color: " + colors.backgroundGrey}
  `;

  export const TabsListButtonContainer = styled.span`
    position: relative;
  `;

  export const TabsListPopup = styled.div`
    outline: 0;
    padding: 5px;
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    background-color: ${colors.backgroundLight3};
    position: absolute;
    right: 0;
    top: 100%;
    width: 20vw;
    z-index: 5000;
  `;

  export const TabsList = styled.div`
    max-height: 60vh;
    overflow-y: auto;
    padding: 5px;
  `;

  export const TabsListItem = styled.div`
    color: ${colors.white};
    padding: 10px;
    font-size: ${fontSizes.mediumSmall};
    cursor: pointer;

    &:hover,
    &:focus {
      background: ${colors.backgroundLight2};
    }
  `;

  export const TabsListLineSeparator = styled.div`
    height: 1px;
    background-color: ${colors.backgroundGrey};
  `;

  export const NoOpenTabsText = styled.div`
    text-align: center;
    font-size: ${fontSizes.small};
    color: white;
    margin: 10px 0;
  `;
}
