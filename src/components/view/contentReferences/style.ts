import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const Section = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    padding-right: 10px;
  `;

  export const Info = styled.div`
    padding: 10px 0;
    font-weight: 400;
  `;

  export const Footer = styled.div`
    font-size: ${fontSizes.mediumSmall};
  `;

  export const Title = styled.div`
    padding: 20px;
    margin: 10px 0;
    background-color: ${colors.backgroundLight3};
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
