import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../../../store/hooks";
import { closeTab } from "../../../../store/slices/tabsSlice";
import { TabModel } from "../../../../store/utils/tabActions";
import { Styles } from "./style";

export function TabCloseButton({
  tab,
  isDragOver,
}: {
  tab: TabModel;
  isDragOver: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <Styles.TabCloseButton
      isDragOver={isDragOver}
      onClick={() => dispatch(closeTab(tab))}
    >
      <CloseIcon />
    </Styles.TabCloseButton>
  );
}
