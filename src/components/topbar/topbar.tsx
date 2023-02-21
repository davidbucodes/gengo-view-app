import { Side } from "../app/side";
import { NavigationMenu } from "./navigationMenu/navigationMenu";
import { Searchbar } from "./searchbar/searchbar";
import { SidebarDisplayMenu } from "./sidebarDisplayMenu/sidebarDisplayMenu";
import { Styles } from "./style";

export function Topbar({
  onToggleSidebar,
  isRightSidebarVisible,
  isLeftSidebarVisible,
}: {
  onToggleSidebar: (side: Side, isVisible: boolean) => void;
  isRightSidebarVisible: boolean;
  isLeftSidebarVisible: boolean;
}): JSX.Element {
  return (
    <Styles.Topbar>
      <NavigationMenu />
      <Searchbar />
      <SidebarDisplayMenu
        onToggleSidebar={onToggleSidebar}
        isRightSidebarVisible={isRightSidebarVisible}
        isLeftSidebarVisible={isLeftSidebarVisible}
      />
    </Styles.Topbar>
  );
}
