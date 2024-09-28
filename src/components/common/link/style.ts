import styled from "styled-components";

export namespace Styles {
  export const Link = styled.div<{ as?: string }>`
    cursor: pointer;
    vertical-align: middle;
    ${props => (props.as === "tr" ? "display: flex;" : "")}
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
