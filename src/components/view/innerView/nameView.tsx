import {
  Database,
  IndexSearchResult,
  NameDocument,
  getReadableNameDocumentType,
} from "@gengo-view/database";
import { useEffect, useState } from "react";
import { Loader } from "../../common/loader/loader";
import { ContentId } from "../contentId";
import { Styles } from "../style";

export function NameView({
  contentId,
}: {
  contentId: ContentId & { type: "name" };
}) {
  const [name, setName] = useState(null as IndexSearchResult<NameDocument>);

  useEffect(() => {
    if (contentId.dbIndex === "name") {
      const nameResult = Database.indices.nameIndex.get(contentId.dbId);
      setName(nameResult);
    }
  }, []);

  return (
    name && (
      <div>
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
        </Loader>
      </div>
    )
  );
}
