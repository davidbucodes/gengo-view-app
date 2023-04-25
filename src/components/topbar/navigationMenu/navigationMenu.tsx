import { useAppDispatch } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Button } from "../../common/button/button";
import { SystemContentIds } from "../../view/contentId";
import { Styles } from "./style";

export function NavigationMenu(): JSX.Element {
  const dispatch = useAppDispatch();

  const buttons: [string, SystemContentIds][] = [
    ["Welcome page", SystemContentIds.Welcome],
    ["Navigation", SystemContentIds.NavigationEfficiency],
    ["Options", SystemContentIds.Options],
    ["About", SystemContentIds.About],
    ["Export", SystemContentIds.Export],
    ["Kanji search", SystemContentIds.KanjiSearch],
  ];

  return (
    <Styles.NavigationMenu>
      {buttons.map(([text, systemContentId]) => (
        <Button
          key={systemContentId}
          text={text}
          onClick={() =>
            dispatch(
              openTab({
                type: "system",
                id: systemContentId,
                label: systemContentId,
              })
            )
          }
        ></Button>
      ))}
    </Styles.NavigationMenu>
  );
}
