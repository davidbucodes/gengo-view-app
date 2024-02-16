import styled from "styled-components";

export namespace Styles {
  export const Link = styled.div`
    cursor: pointer;
    display: block;
    vertical-align: middle;
    &:hover,
    &:focus {
      div,
      span,
      tr {
        text-decoration: underline;
      }
    }
  `;

  export const TrLink = styled.tr(Link);
}
