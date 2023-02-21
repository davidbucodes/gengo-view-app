import PushPinIcon from "@mui/icons-material/PushPin";
import { useAppDispatch } from "../../../../store/hooks";
import { setTabPinnedState } from "../../../../store/slices/tabsSlice";
import { TabModel } from "../../../../store/utils/tabActions";
import { Styles } from "./style";

export function TabPinButton({
  tab,
  isDragOver,
}: {
  tab: TabModel;
  isDragOver: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <Styles.TabPinButton
      isDragOver={isDragOver}
      onClick={() => {
        return dispatch(setTabPinnedState({ tab, isPinned: false }));
      }}
    >
      <PushPinIcon />
    </Styles.TabPinButton>
  );
}
