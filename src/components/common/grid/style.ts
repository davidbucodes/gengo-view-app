import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Grid = styled.div<{ gridStyle?: boolean }>`
    flex-grow: 1;
    display: flex;
    ${props =>
      props.gridStyle &&
      `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
    `}
    text-align: center;
    background-color: ${colors.backgroundLight3};
    user-select: none;
    position: relative;
  `;

  export const GridItem = styled.div<{
    isTabDragged?: boolean;
    "data-tooltip"?: string;
  }>`
    text-align: center;
    color: ${colors.backgroundLight6};
    cursor: pointer;
    font-size: ${fontSizes.medium};
    padding: 7px;
    user-select: none;
    position: relative;
    display: inline-block;

    &:hover {
      background: ${colors.backgroundLight2};
    }

    ${props => {
      if (props.isTabDragged) {
        return `
      &:hover::after {
        visibility: hidden;
      }
      `;
      }
    }}

    ${props =>
      props["data-tooltip"] &&
      `
      &:hover::after {
        visibility: visible;
      }
      
    &::after {
    user-select: none;
    visibility: hidden;
      display: block;
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      color: ${colors.backgroundGrey};
      background: ${colors.backgroundLight2};
      font-size: ${fontSizes.small};
      z-index: 500000;
      float: left;
      white-space: pre;
      padding: 5px;
      border-radius: 10px;
    }
  `}
  `;

  export const TooltipContent = styled.div`
    font-size: ${fontSizes.medium};
  `;
}
