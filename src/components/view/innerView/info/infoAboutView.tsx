import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function InfoAboutView({
  contentId,
}: {
  contentId: ContentId & { type: "info" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>About</Styles.Header>
        <Styles.Line>
          This project enables searching Japanese words.
        </Styles.Line>
      </div>
    )
  );
}
