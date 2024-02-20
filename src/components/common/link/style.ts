import styled from "styled-components";

export namespace Styles {
  export const Link = styled.div`
    cursor: pointer;
    vertical-align: middle;
    &:hover,
    &:focus {
      div,
      span,
      tr,
      td {
        text-decoration: underline;
      }
    }
  `;
}
