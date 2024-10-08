import { ChangeEvent, useState } from "react";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";
import { TextReader } from "../../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../../utils/tts";

export function SystemTextToSpeechView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const [textToRead, setTextToRead] = useState<string>("");

  function onTextToReadChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    ev.preventDefault();
    ev.stopPropagation();
    setTextToRead(ev.target.value);
  }

  return (
    contentId && (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Styles.Header>Text-to-speech</Styles.Header>
        <Styles.Line>
          Paste here text to read:{" "}
          <TextReader language={TextVoiceLanguage.JA} textToRead={textToRead} />
        </Styles.Line>
        <Styles.Textarea onChange={onTextToReadChange} />
      </div>
    )
  );
}
