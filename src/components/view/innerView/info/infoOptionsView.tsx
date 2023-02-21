import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function InfoOptionsView({
  contentId,
}: {
  contentId: ContentId & { type: "info" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Options</Styles.Header>
        <Styles.Line>There are options. (Not implemented yet)</Styles.Line>
      </div>
    )
  );
}
