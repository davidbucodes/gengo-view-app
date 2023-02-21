import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function InfoWelcomeView({
  contentId,
}: {
  contentId: ContentId & { type: "info" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Welcome to GengoView!</Styles.Header>
        <Styles.Line>
          This project enables searching Japanese words.
        </Styles.Line>
      </div>
    )
  );
}
