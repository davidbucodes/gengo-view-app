import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Section = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    margin-bottom: 10px;
    padding-right: 10px;
  `;

  export const Info = styled.div`
    padding: 10px 0;
    font-weight: 400;
  `;

  export const Footer = styled.div`
    font-size: ${fontSizes.small};
  `;

  export const Title = styled.div`
    padding: 13px 17px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${colors.backgroundLight3};
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  export const FoldButton = styled.button<{
    isFolded: boolean;
  }>`
    all: unset;
    height: 15px;
    width: 15px;
    cursor: pointer;
    background-color: ${colors.white};
    mask-origin: content-box;
    mask-repeat: no-repeat;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
    padding: 10px;
    ${props => (props.isFolded ? "" : "transform: rotate(180deg);")};
  `;

  export const TitleText = styled.div`
    flex-grow: 1;
  `;

  export const TextFilterInput = styled.input.attrs({
    type: "search",
  })`
    background: ${colors.backgroundLight3};
    padding: 8px;
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
  `;

  export const TableBody = styled.tbody`
    td {
      border: ${colors.backgroundLight3} 1px solid;
    }
    td:not(:last-child) {
      width: 8em;
    }
  `;
}
