import { Side } from "../../app/side";
import { Button } from "../../common/button/button";
import { SidebarDisplayToggleBadge } from "./sidebarDisplayToggleBadge";
import { Styles } from "./style";

export function SidebarDisplayMenu({
  onToggleSidebar,
  isRightSidebarVisible,
  isLeftSidebarVisible,
}: {
  onToggleSidebar: (side: Side, isVisible: boolean) => void;
  isRightSidebarVisible: boolean;
  isLeftSidebarVisible: boolean;
}): JSX.Element {
  return (
    <Styles.SidebarDisplayMenu>
      <Button
        tooltip={`${isLeftSidebarVisible ? "Hide" : "Show"} left sidebar`}
        onClick={() => onToggleSidebar("left", !isLeftSidebarVisible)}
      >
        <SidebarDisplayToggleBadge
          side={"left"}
          isSidebarDisplayed={isLeftSidebarVisible}
        />
      </Button>
      <Button
        tooltip={`${isRightSidebarVisible ? "Hide" : "Show"} right sidebar`}
        onClick={() => onToggleSidebar("right", !isRightSidebarVisible)}
      >
        <SidebarDisplayToggleBadge
          side={"right"}
          isSidebarDisplayed={isRightSidebarVisible}
        />
      </Button>
    </Styles.SidebarDisplayMenu>
  );
}
