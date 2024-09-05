import { Edit, Delete, OpenInNew } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  closeTab,
  openTab,
  setDraggedContent,
} from "../../../../../store/slices/tabsSlice";
import { TabModel } from "../../../../../store/utils/tabActions";
import { Button } from "../../../../common/button/button";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";
import { Styles as FamiliarStyles } from "./style";
import { colors } from "../../../../../theme";
import { Grid } from "../../../../common/grid/grid";
import { GridItemModel } from "../../../../common/grid/gridItem";

export function SystemFamiliarsView() {
  const dispatch = useAppDispatch();

  const familiars = useAppSelector(state => state.familiars.savedFamiliars);

  function openFamiliarTabs() {
    Object.values(familiars).forEach(contentId => {
      dispatch(openTab({ contentId }));
    });
  }

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab({ contentId }));
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const items: GridItemModel[] = Object.values(familiars).map(id => ({
    label: id.label,
    value: id,
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
  }));

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Styles.Header>
        Familiars
        <FamiliarStyles.ActionButtonsWrapper>
          <Button onClick={openFamiliarTabs} tooltip="Open familiar tabs">
            <OpenInNew />
          </Button>
        </FamiliarStyles.ActionButtonsWrapper>
      </Styles.Header>
      <Grid items={items} />
    </div>
  );
}
