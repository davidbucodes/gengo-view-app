import { zip } from "lodash";
import { useAppSelector } from "../../../store/hooks";
import { Side } from "../../app/side";
import { Styles } from "./style";
import { TabModel } from "../../../store/utils/tabActions";
import { ContentIdBadge } from "../../common/contentIdBadge/contentIdBadge";

export function TabsListItem({
  tab,
  onClick,
}: {
  tab: TabModel;
  onClick: () => void;
}) {
  return (
    <Styles.TabsListItem
      onClick={() => {
        onClick();
      }}
    >
      <ContentIdBadge tabContentType={tab.content.type} />
      {tab.label}
    </Styles.TabsListItem>
  );
}
