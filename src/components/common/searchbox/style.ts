import styled from "styled-components";
import { colors } from "../../../theme";

export namespace Styles {
  export const Searchbox = styled.input`
    width: 70%;
    background: ${colors.backgroundLight3};
    appearance: none;
    padding: 5px;
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    margin: 10px;
    font-style: italic;
    text-align: center;
    color: ${colors.backgroundLight5};
  `;
}
