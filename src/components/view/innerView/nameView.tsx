import {
  Database,
  IndexName,
  IndexSearchResult,
  NameDocument,
  getReadableNameDocumentType,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { Loader } from "../../common/loader/loader";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";

export function NameView({
  contentId,
}: {
  contentId: ContentId & { type: "name" };
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
      <Styles.InnerView>
        <Loader isLoaded={Boolean(name)}>
          <Styles.Header>{name?.n}</Styles.Header>
          <div>
            {Boolean(name.r.length) && (
              <Styles.Line>
                <b>Reading:</b> {name.r.join(", ")}
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

          <ContentReferences contentId={contentId} indexNames={indexNames} />
        </Loader>
      </Styles.InnerView>
    )
  );
}
