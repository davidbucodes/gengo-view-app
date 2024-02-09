import styled from "styled-components";
import { fontSizes } from "../../../../theme";

export namespace Styles {
  export const SearchResult = styled.div`
    font-size: ${fontSizes.mediumSmall};
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
}
