import styled from "styled-components";
import { colors } from "../../../theme";

interface SidebarDisplayToggleBadgeProps {
  side: "right" | "left";
}

type SidebarDisplayToggleBadgeSideProps = SidebarDisplayToggleBadgeProps & {
  isSidebarDisplayed: boolean;
};

export namespace Styles {
  export const SidebarDisplayMenu = styled.div`
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
}
