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
