import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemWelcomeView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Welcome to GengoView!</Styles.Header>
        <Styles.Line>
          This project enables searching Japanese words.
        </Styles.Line>
        <Styles.Line>
          This project is still in beta version, so there are some features not
          implemented yet.
        </Styles.Line>
        <Styles.Line>
          Start exploring by: dropping kanji from the list, clicking on kanji
          from the list or opening search result
        </Styles.Line>
      </div>
    )
  );
}
