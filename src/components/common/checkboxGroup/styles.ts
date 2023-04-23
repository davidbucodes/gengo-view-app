import styled from "styled-components";

export namespace Styles {
  export const CheckboxGroup = styled.div``;
  export const Checkbox = styled.div`
    display: flex;
  `;
  export const CheckboxLabel = styled.label`
    flex-grow: 1;
  `;
  export const CheckboxInput = styled.input.attrs({
    type: "checkbox",
  })``;
}
