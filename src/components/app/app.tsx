import { Database, Jlpt } from "@davidbucodes/gengo-view-database";
import { SvgByKanji } from "@davidbucodes/gengo-view-kanji-svgs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsDatabaseLoaded,
  setIsSvgByKanjiLoaded,
  setLoadingPercentage,
} from "../../store/slices/databaseLoadStatusSlice";
import { AppLayout } from "./appLayout";
import { DatabaseLoader } from "./databaseLoader";
import { Styles } from "./style";

export function App() {
  const dispatch = useAppDispatch();
  const isDatabaseLoaded = useAppSelector(state => {
    return state.databaseLoadStatus.isDatabaseLoaded;
  });
  const loadingPercentage = useAppSelector(state => {
    return state.databaseLoadStatus.loadingPercentage;
  });
  const isSvgByKanjiLoaded = useAppSelector(state => {
    return state.databaseLoadStatus.isSvgByKanjiLoaded;
  });

  useEffect(() => {
    const shouldLoad = !isSvgByKanjiLoaded && !isDatabaseLoaded;
    if (shouldLoad) {
      (async () => {
        await Database.load(
          {
            kanjiIndexUrl: "./indices/kanji.index.json",
            vocabularyIndexUrl: "./indices/vocabulary.index.json",
            nameIndexUrl: "./indices/name.index.json",
            sentenceIndexUrl: "./indices/sentence.index.json",
          },
          percentage =>
            dispatch(
              setLoadingPercentage(loadingPercentage + percentage * 0.75)
            )
        );
        await Jlpt.init();
        dispatch(setIsDatabaseLoaded(true));
      })();
      (async () => {
        await SvgByKanji.load("./svgByKanji.json");
        dispatch(setIsSvgByKanjiLoaded(true));
        dispatch(setLoadingPercentage(loadingPercentage + 0.25));
      })();
    }
  }, [isDatabaseLoaded, isSvgByKanjiLoaded]);

  return (
    <Styles.App>
      {isDatabaseLoaded && isSvgByKanjiLoaded ? (
        <AppLayout />
      ) : (
        <DatabaseLoader loadingPercentage={loadingPercentage} />
      )}
    </Styles.App>
  );
}
