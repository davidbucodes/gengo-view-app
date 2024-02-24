import {
  Database,
  IndexName,
  IndexSearchResult,
  NameDocument,
  getReadableNameDocumentType,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../common/loader/loader";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";
import { InnerView } from "./innerView";

export function NameView({
  contentId,
  previousContentIds,
  isDisplayed,
}: {
  contentId: ContentId & { type: "name" };
  previousContentIds: ContentId[];
  isDisplayed: boolean;
}) {
  const [name, setName] = useState(null as IndexSearchResult<NameDocument>);
  const [indexNames] = useState<IndexName[]>([
    "sentence",
    "vocabulary",
    "name",
    "kanji",
  ]);

  useEffect(() => {
    const nameResult =
      Database.getById<IndexSearchResult<NameDocument>>(contentId);
    setName(nameResult);
  }, []);

  return (
    name && (
      <InnerView isDisplayed={isDisplayed} focusOnArgsChange={[name]}>
        <Loader isLoaded={Boolean(name)}>
          <Styles.Definitions>
            <Styles.Header>{name?.n}</Styles.Header>
            <div>
              {Boolean(name.r.length) && (
                <Styles.Line>
                  <b>Reading:</b> {name.r.join(", ")}
                  <TextReader
                    language={TextVoiceLanguage.JA}
                    textToRead={name.r.join(", ")}
                  />
                </Styles.Line>
              )}
              {Boolean(name.d.length) && (
                <Styles.Line>
                  <b>Description:</b> {name.d}
                </Styles.Line>
              )}
              {Boolean(name.t) && (
                <Styles.Line>
                  <b>Name type:</b> {getReadableNameDocumentType(name).t}
                </Styles.Line>
              )}
            </div>
          </Styles.Definitions>
          <ContentReferences
            contentId={contentId}
            indexNames={indexNames}
            previousContentIds={previousContentIds}
          />
        </Loader>
      </InnerView>
    )
  );
}
