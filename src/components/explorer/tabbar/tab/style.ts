import styled from "styled-components";
import { colors, fontSizes } from "../../../../theme";

interface TabCloseButtonProps {
  isDragOver: boolean;
}

type TabPinButtonProps = TabCloseButtonProps;

interface TabProps {
  isActive: boolean;
  isDragOver: boolean;
}

interface TabBadge {
  backgroundColor: string;
}

export namespace Styles {
  export const Tab = styled.div<TabProps>`
    height: 25px;
    min-width: 110px;
    display: inline-flex;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    margin-right: 1px;
    font-size: ${fontSizes.small};
    color: ${colors.backgroundLight6};
    background-color: ${({ isActive, isDragOver }) =>
      isDragOver
        ? colors.backgroundGrey
        : isActive
        ? colors.background
        : colors.backgroundLight2};
    cursor: pointer;
    user-select: none;
  `;

  export const TabBadge = styled.div<TabBadge>`
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

  export const TabLabel = styled.div`
    flex-grow: 1;
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 5px;
    pointer-events: none;
  `;

  export const TabCloseButton = styled.div<TabCloseButtonProps>`
    color: white;
    display: inline-flex;
    align-items: center;
    width: ${fontSizes.small};
    height: 100%;
    font-size: ${fontSizes.small};
    line-height: ${fontSizes.small};
    text-align: center;
    border-radius: 3px;
    ${props => props.isDragOver && "pointer-events: none;"}

    &:hover {
      background-color: ${colors.backgroundLight3};
    }
  `;

  export const TabPinButton = styled(TabCloseButton)<TabPinButtonProps>``;
}
