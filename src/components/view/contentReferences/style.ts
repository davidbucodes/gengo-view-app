import styled from "styled-components";
import { colors } from "../../../theme";

export namespace Styles {
  export const Section = styled.div``;

  export const Info = styled.div`
    padding: 10px 0;
    font-weight: 400;
  `;

  export const Title = styled.div`
    padding: 20px;
    margin: 10px 0;
    background-color: ${colors.backgroundGrey};
  `;

  export const Links = styled.div``;

  export const Link = styled.span`
    color: ${colors.blue};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `;
}
