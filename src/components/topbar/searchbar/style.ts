import styled from "styled-components";
import { colors, fontSizes } from "../../../theme";

export namespace Styles {
  export const SearchbarWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
  `;

  export const Searchbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;
  `;

  export const SearchInput = styled.input`
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

  export const SearchResultsPopup = styled.div`
    padding: 5px;
    border: 3px solid ${colors.backgroundLight4};
    border-radius: 10px;
    background-color: ${colors.backgroundLight3};
    position: absolute;
    left: 50%;
    top: 100%;
    width: 70%;
    min-width: 45vw;
    transform: translate(-50%, 0);
    z-index: 5000;
  `;
  export const SearchResults = styled.div`
    max-height: 70vh;
    overflow-y: auto;
  `;
  export const SearchResult = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    &:hover,
    &:focus {
      background: ${colors.backgroundLight2};
    }
  `;
  export const SearchResultText = styled.div`
    font-size: ${fontSizes.small};
    color: white;
  `;
  export const SearchResultsCount = styled.div`
    font-size: ${fontSizes.smaller};
    color: white;
    margin: 10px 0;
  `;
  export const NoSearchResultsText = styled.div`
    font-size: ${fontSizes.small};
    color: white;
    margin: 10px 0;
  `;
}
