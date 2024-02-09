import styled from "styled-components";
import { colors } from "../../../theme";

export namespace Styles {
  export const Link = styled.span`
    cursor: pointer;
    display: contents;
    vertical-align: middle;
    &:hover {
      color: ${colors.backgroundLight6} !important;
    }
    &:hover {
      div,
      span,
      tr {
        text-decoration: underline;
      }
    }
  `;
}
