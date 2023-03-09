import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function InfoNavigationView({
  contentId,
}: {
  contentId: ContentId & { type: "info" };
}) {
  return (
    contentId && (
      <div>
        <Styles.Header>Navigation</Styles.Header>
        <Styles.Line>Navigation infor page (Not implemented yet)</Styles.Line>
      </div>
    )
  );
}
