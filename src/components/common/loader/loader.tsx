import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Styles } from "./style";

export function Loader({
  children,
  isLoaded,
}: React.PropsWithChildren<{ isLoaded: boolean }>): JSX.Element {
  return (
    <Styles.LoaderWrapper>
      {!isLoaded && <CircularProgress />}
      {children}
    </Styles.LoaderWrapper>
  );
}
