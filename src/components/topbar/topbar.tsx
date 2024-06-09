import { Side } from "../app/side";
import { SearchbarLeftMenu } from "./searchbarLeftMenu/searchbarLeftMenu";
import { Searchbar } from "./searchbar/searchbar";
import { SearchbarRightMenu } from "./searchbarRightMenu/searchbarRightMenu";
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
      <SearchbarLeftMenu />
      <Searchbar />
      <SearchbarRightMenu
        onToggleSidebar={onToggleSidebar}
        isRightSidebarVisible={isRightSidebarVisible}
        isLeftSidebarVisible={isLeftSidebarVisible}
      />
    </Styles.Topbar>
  );
}
