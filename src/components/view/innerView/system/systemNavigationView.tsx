import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemNavigationView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Navigation</Styles.Header>
        <Styles.Line>Navigation system page (Not implemented yet)</Styles.Line>
      </div>
    )
  );
}
