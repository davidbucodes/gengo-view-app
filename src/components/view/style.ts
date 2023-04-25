import styled from "styled-components";
import { colors, fontSizes } from "../../theme";

export namespace Styles {
  export const View = styled.div<{ isDisplayed: boolean }>`
    font-size: ${fontSizes.medium};
    color: white;
    padding: 15px;
    display: flex;
    flex-grow: 1;
    min-height: 0;
    min-width: 0;
    position: relative;
    overflow-y: auto;
    overflow-x: auto;
    ${props => (props.isDisplayed ? "" : "display: none;")}
  `;

  export const InnerView = styled.div`
    flex-grow: 1;
    padding-bottom: 30px;
    overflow-y: auto;
  `;

  export const Header = styled.div`
    line-height: ${fontSizes.larger};
    font-size: ${fontSizes.large};
    vertical-align: center;
    padding-bottom: ${fontSizes.smaller};
    font-weight: bold;
  `;
  export const Title = styled.div`
    line-height: ${fontSizes.large};
    font-size: ${fontSizes.medium};
    vertical-align: center;
    padding-top: ${fontSizes.tiny};
    padding-bottom: ${fontSizes.medium};
    font-weight: bold;
  `;
  export const Line = styled.div`
    line-height: ${fontSizes.large};
    font-size: ${fontSizes.medium};
    vertical-align: center;
    padding-bottom: ${fontSizes.tiny};
  `;

  export const Code = styled.pre`
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 30vh;
    overflow-y: scroll;
    border: ${colors.backgroundLight4} 1px solid;
    border-radius: 10px;
    padding: 10px;
    margin: 0;
  `;
}
