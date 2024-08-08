import styled from "styled-components";
import { colors, fontSizes } from "../../../../../theme";

export namespace Styles {
  export const ListsList = styled.div`
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  `;
  export const ListWrapper = styled.fieldset`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 14px;
    color: ${({ color }) => color || colors.white};
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: ${colors.backgroundDark2};
    }
  `;
  export const ListTitle = styled.legend`
    display: flex;
    gap: 10px;
    align-items: center;
  `;
  export const ListDateTime = styled.div`
    color: ${colors.backgroundLight4};
    display: block;
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
  export const ListTitleText = styled.div`
    display: flex;
    align-items: center;
    gap: 1ch;
    flex-grow: 1;
  `;
  export const ActionButtonsWrapper = styled.span`
    flex-shrink: 0;
  `;
}
