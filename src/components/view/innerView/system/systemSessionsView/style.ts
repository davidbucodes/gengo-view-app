import styled from "styled-components";
import { colors, fontSizes } from "../../../../../theme";

export namespace Styles {
  export const SessionsList = styled.div`
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  `;
  export const SessionWrapper = styled.fieldset`
    display: inline-flex;
    align-items: center;
    gap: 10px;
  `;
  export const SessionTitle = styled.legend`
    display: flex;
    gap: 10px;
    align-items: center;
  `;
  export const SessionDateTime = styled.span`
    color: ${colors.backgroundLight4};
  `;
  export const ContentIdsGroupContainer = styled.div<{ setBorder: boolean }>`
    ${props => (props.setBorder ? "border: 1px solid grey; padding: 2px;" : "")}
    display: flex;
    justify-content: center;
    flex-grow: 1;
    flex-wrap: wrap;
  `;
  export const ContentId = styled.div`
    color: ${colors.white};
    padding: 10px;
    font-size: ${fontSizes.mediumSmall};
    cursor: pointer;

    &:hover,
    &:focus {
      background: ${colors.backgroundLight2};
    }
  `;
  export const SessionTitleText = styled.div`
    flex-grow: 1;
  `;
  export const ActionButtonsWrapper = styled.div`
    flex-shrink: 0;
  `;
}
