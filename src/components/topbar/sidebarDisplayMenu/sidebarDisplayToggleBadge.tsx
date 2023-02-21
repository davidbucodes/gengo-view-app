import { Side } from "../../app/side";
import { Styles } from "./style";

export function SidebarDisplayToggleBadge({
  side,
  isSidebarDisplayed,
}: {
  side: Side;
  isSidebarDisplayed: boolean;
}) {
  return (
    <Styles.SidebarDisplayToggleBadge side={side}>
      <Styles.SidebarDisplayToggleBadgeSide
        side={side}
        isSidebarDisplayed={isSidebarDisplayed}
      />
    </Styles.SidebarDisplayToggleBadge>
  );
}
