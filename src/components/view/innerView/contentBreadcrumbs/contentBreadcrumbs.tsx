import { ContentIdLink } from "../../../common/contentIdLink/link";
import { ContentId } from "../../contentId";
import { Styles } from "./style";

export function ContentBreadcrumbs({
  contentIds,
}: {
  contentIds: ContentId[];
}): JSX.Element {
  return (
    <Styles.ContentBreadcrumbs>
      {contentIds.map((contentId, index) => (
        <>
          <ContentIdLink contentId={contentId}>{contentId.label}</ContentIdLink>
          {index + 1 < contentIds.length && " > "}
        </>
      ))}
    </Styles.ContentBreadcrumbs>
  );
}
