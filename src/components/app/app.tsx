import { Database, Jlpt } from "@davidbucodes/gengo-view-database";
import { SvgByLetter } from "@davidbucodes/gengo-view-svgs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsDatabaseLoaded,
  setIsSvgByLetterLoaded,
  setLoadingPercentage,
} from "../../store/slices/databaseLoadStatusSlice";
import { AppLayout } from "./appLayout";
import { DatabaseLoader } from "./databaseLoader";
import { Styles } from "./style";
import { TextToSpeech } from "../../utils/tts";

export function App() {
  const dispatch = useAppDispatch();
  const isDatabaseLoaded = useAppSelector(state => {
    return state.databaseLoadStatus.isDatabaseLoaded;
  });
  const loadingPercentage = useAppSelector(state => {
    return state.databaseLoadStatus.loadingPercentage;
  });
  const isSvgByLetterLoaded = useAppSelector(state => {
    return state.databaseLoadStatus.isSvgByLetterLoaded;
  });

  useEffect(() => {
    const shouldLoad = !isSvgByLetterLoaded && !isDatabaseLoaded;
    if (shouldLoad) {
      TextToSpeech.loadAllVoices();
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
        await SvgByLetter.load("./svgByKanji.json");
        dispatch(setIsSvgByLetterLoaded(true));
        dispatch(setLoadingPercentage(loadingPercentage + 0.25));
      })();
    }
  }, [isDatabaseLoaded, isSvgByLetterLoaded]);

  return (
    <Styles.App>
      {isDatabaseLoaded && isSvgByLetterLoaded ? (
        <AppLayout />
      ) : (
        <DatabaseLoader loadingPercentage={loadingPercentage} />
      )}
    </Styles.App>
  );
}
