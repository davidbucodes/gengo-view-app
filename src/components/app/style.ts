import LinearProgress from "@mui/material/LinearProgress";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { colors, fontSizes } from "../../theme";

export namespace Styles {
  export const App = styled.div`
    background-color: ${colors.background};
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    flex-grow: 1;
  `;

  export const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    overflow-y: auto;
  `;

  export const LoadingDatabase = styled.div`
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  `;

  export const LoadingDatabaseHeader = styled.div`
    font-size: ${fontSizes.giant};
    padding-bottom: ${fontSizes.larger};
    font-weight: bold;
  `;

  export const LoadingDatabaseText = styled.div`
    font-size: ${fontSizes.large};
    padding-bottom: ${fontSizes.larger};
  `;

  export const BorderLinearProgress = muiStyled(LinearProgress)`
    height: 10px;
    border-radius: 5px;
  `;
}
