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
    vertical-align: middle;
    padding-bottom: ${fontSizes.smaller};
    font-weight: bold;
  `;
  export const Title = styled.div`
    line-height: ${fontSizes.large};
    font-size: ${fontSizes.medium};
    vertical-align: middle;
    padding-top: ${fontSizes.tiny};
    padding-bottom: ${fontSizes.medium};
    font-weight: bold;
  `;
  export const Line = styled.div`
    line-height: ${fontSizes.large};
    font-size: ${fontSizes.medium};
    vertical-align: middle;
    padding-bottom: ${fontSizes.tiny};
    display: flex;
    gap: 1ch;
    align-items: center;
  `;
  export const KeyValueTable = styled.table`
    border-collapse: collapse;
    flex-grow: 1;
    font-weight: lighter;

    td:not(:last-child) {
      width: 8em;
    }
  `;

  export const KeyValueTableBody = styled.tbody``;
  export const KeyValueRow = styled.tr``;
  export const Key = styled.td``;
  export const Value = styled.td``;

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
  export const Textbox = styled.input`
    padding: 5px;
    font-size: 2rem;
  `;
  export const SearchResult = styled.div`
    padding: 1ch;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid grey;
    margin-bottom: 1ch;
  `;
  export const SearchResultLine = styled.div`
    display: flex;
    gap: 1ch;
    text-align: left;
    align-items: start;
  `;
  export const SearchResultsTable = styled.div`
    display: flex;
    overflow-y: auto;
    flex-grow: 1;
  `;
}
