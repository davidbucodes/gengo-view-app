import { useState } from "react";
import { Styles } from "./style";
import { TextToSpeech, TextVoiceLanguage } from "../../../utils/tts";

export function TextReader({
  textToRead,
  language,
}: {
  textToRead: string;
  language: TextVoiceLanguage;
}): JSX.Element {
  const [isPlay, setIsPlay] = useState(false);

  if (!TextToSpeech.isVoiceAvailable) {
    return;
  }

  function play() {
    TextToSpeech.speak(textToRead, language, () => {
      console.log(false);
      setIsPlay(false);
    });
    setIsPlay(true);
  }

  function stop() {
    TextToSpeech.stopSpeaking();
    setIsPlay(false);
  }

  function onButtonPress() {
    !isPlay ? play() : stop();
  }

  return (
    <Styles.Button
      role={!isPlay ? "play" : "stop"}
      aria-label={!isPlay ? "play" : "stop"}
      tabIndex={1}
      onClick={() => onButtonPress()}
      onKeyDown={ev => {
        if (ev.code === "Enter" || ev.code === "Space") {
          ev.preventDefault();
          onButtonPress();
        }
      }}
    >
      {!isPlay ? <Styles.PlayButton /> : <Styles.StopButton />}
    </Styles.Button>
  );
}
