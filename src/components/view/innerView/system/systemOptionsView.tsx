import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemOptionsView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Options</Styles.Header>
        <Styles.Line>Options page (Not implemented yet)</Styles.Line>
      </div>
    )
  );
}
