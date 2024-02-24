import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Section = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    border-radius: 7px;
    margin-right: 10px;
    outline: ${colors.outlineDark} solid 1px;
  `;

  export const Info = styled.div``;

  export const Footer = styled.div`
    font-weight: 400;
    padding: 10px 15px;
    border: ${colors.backgroundLight3} 1px solid;
    border-top: 0;
    background: ${colors.backgroundLight1};
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    font-size: ${fontSizes.smallSubtitle};
  `;

  export const Title = styled.div<{
    isFolded: boolean;
  }>`
    padding: 7px 15px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    background-color: ${colors.backgroundLight3};
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    font-weight: 600;
    user-select: none;
    cursor: pointer;
    ${props => (props.isFolded ? "border-radius: 7px;" : "")}
  `;

  export const FoldButtonWrapper = styled.div``;

  export const FoldButton = styled.div<{
    isFolded: boolean;
  }>`
    height: 15px;
    width: 15px;
    background-color: ${colors.white};
    mask-origin: content-box;
    mask-repeat: no-repeat;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
    padding: 10px 5px;
    ${props => (props.isFolded ? "" : "transform: rotate(180deg);")};
  `;

  export const TitleText = styled.div`
    flex-grow: 1;
  `;

  export const TextFilterInput = styled.input.attrs({
    type: "search",
  })`
    background: ${colors.backgroundLight3};
    padding: 5px;
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    font-style: italic;
    color: ${colors.backgroundLight5};
  `;

  export const Links = styled.div``;

  export const Link = styled.span`
    color: ${colors.blue};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `;

  export const Table = styled.table`
    background: ${colors.backgroundLight1};
    border-collapse: collapse;
    flex-grow: 1;
    font-weight: lighter;
    table-layout: fixed;
  `;

  export const TableBody = styled.tbody`
    td {
      border: ${colors.backgroundLight3} 1px solid;
      position: relative;
      background: ${colors.backgroundLight1};
    }
    td:not(:last-child) {
      min-width: 4em;
      word-break: keep-all;
    }
    td:last-child {
      width: 99%;
    }
  `;
}
