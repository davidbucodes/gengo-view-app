import styled from "styled-components";

export namespace Styles {
  export const Link = styled.span`
    cursor: pointer;
    display: contents;
    vertical-align: middle;
    &:hover {
      div,
      span,
      tr {
        text-decoration: underline;
      }
    }
  `;
}
