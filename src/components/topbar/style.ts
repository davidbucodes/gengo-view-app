import styled from "styled-components";
import { colors } from "../../theme";

export namespace Styles {
  export const Topbar = styled.div`
    flex-shrink: 0;
    display: flex;
    background-color: ${colors.backgroundLight1};
    min-height: 45px;
  `;
}
