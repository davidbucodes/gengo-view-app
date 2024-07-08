import { SvgByKanji } from "@davidbucodes/gengo-view-svgs";
import { useEffect, useState } from "react";
import { Loader } from "../loader/loader";
import { Styles } from "./style";

export function KanjiSvg({ kanji }: { kanji: string }): JSX.Element {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [kanjiSvgUrl, setKanjiSvgUrl] = useState(null);

  useEffect(() => {
    const svgStr = SvgByKanji.get(kanji);
    if (!svgStr) {
      setErrorMessage("No kanji image available at the database");
      setIsErrorLoading(true);
    } else {
      const svg = new Blob([svgStr], { type: "image/svg+xml" });
      setKanjiSvgUrl(URL.createObjectURL(svg));
    }
  }, []);

  return (
    <>
      {!isErrorLoading && (
        <Loader isLoaded={isLoaded}>
          <Styles.Svg
            src={kanjiSvgUrl}
            isHidden={!isLoaded}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setErrorMessage("Error loading Kanji SVG file");
              setIsErrorLoading(true);
            }}
          />
        </Loader>
      )}
      {isErrorLoading && (
        <Styles.SvgLoadingError>{errorMessage}</Styles.SvgLoadingError>
      )}
    </>
  );
}
