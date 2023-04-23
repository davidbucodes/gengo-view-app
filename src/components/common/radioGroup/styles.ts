import styled from "styled-components";

export namespace Styles {
  export const RadioGroup = styled.div``;
  export const RadioButton = styled.div`
    display: flex;
  `;
  export const RadioButtonLabel = styled.label`
    flex-grow: 1;
  `;
  export const RadioButtonInput = styled.input.attrs({
    type: "radio",
  })``;
}
