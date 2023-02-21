import styled from "styled-components";
import { colors } from "../../../theme";

export namespace Styles {
  export const Button = styled.div`
    user-select: none;
    cursor: pointer;
    appearance: none;
    background: ${colors.backgroundLight3};
    padding: 5px 7px;
    color: ${colors.backgroundLight5};
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    margin: 10px 5px;
    display: inline-flex;
    align-items: center;

    &:hover {
      background: ${colors.backgroundLight2};
    }
  `;
}
