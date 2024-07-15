import { Settings, Download, Save, HistoryEdu } from "@mui/icons-material";
import { useAppDispatch } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Button } from "../../common/button/button";
import { SystemContentIds } from "../../view/contentId";
import { Styles } from "./style";
import { colors } from "../../../theme";

export function SearchbarLeftMenu(): JSX.Element {
  const dispatch = useAppDispatch();

  const buttons: [JSX.Element, string, SystemContentIds][] = [
    [<Settings />, "Settings", SystemContentIds.Options],
    [<Download />, "Export", SystemContentIds.Export],
    [<HistoryEdu />, "Sessions", SystemContentIds.Sessions],
  ];

  return (
    <Styles.SearchbarLeftMenu>
      {buttons.map(([element, tooltip, systemContentId]) => (
        <Button
          key={systemContentId}
          element={element}
          tooltip={tooltip}
          color={colors.backgroundGrey}
          onClick={() =>
            dispatch(
              openTab({
                contentId: {
                  type: "system",
                  id: systemContentId,
                  label: tooltip,
                },
              })
            )
          }
        ></Button>
      ))}
    </Styles.SearchbarLeftMenu>
  );
}
