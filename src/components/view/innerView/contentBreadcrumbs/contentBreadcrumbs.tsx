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
      Previous:{" "}
      {contentIds.map((contentId, index) => (
        <span key={index}>
          <ContentIdLink
            title={`${contentId.label} - ${contentId.type}`}
            contentId={contentId}
          >
            {contentId.label}
          </ContentIdLink>
          {index + 1 < contentIds.length && " > "}
        </span>
      ))}
    </Styles.ContentBreadcrumbs>
  );
}
