import { useEffect, useRef, useState } from "react";
import { Button } from "../../common/button/button";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { colors } from "../../../theme";
import { Styles } from "./style";
import { TabsList } from "./tabsList";
import { TabModel } from "../../../store/utils/tabActions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveTab } from "../../../store/slices/tabsSlice";

export function TabsListPopupButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const tabsListPopupRef = useRef<HTMLDivElement>();
  const [isTabsListPopupOpen, setIsTabsListPopupOpen] =
    useState<boolean>(false);

  const tabGroups = Object.values(
    useAppSelector(state => state.tabs.tabGroups)
  );

  function onTabClick(tab: TabModel) {
    dispatch(setActiveTab(tab));
    setIsTabsListPopupOpen(false);
  }

  function openPopup() {
    setIsTabsListPopupOpen(true);
    setTimeout(() => {
      tabsListPopupRef.current?.focus();
    });
  }

  return (
    <Styles.TabsListButtonContainer>
      <Button
        color={colors.backgroundGrey}
        tooltip={`${isTabsListPopupOpen ? "Hide" : "Show"} tabs list popup`}
        onClick={() => {
          !isTabsListPopupOpen ? openPopup() : setIsTabsListPopupOpen(false);
        }}
      >
        {isTabsListPopupOpen ? (
          <ChevronLeft
            style={{
              rotate: "90deg",
            }}
          />
        ) : (
          <ChevronRight
            style={{
              rotate: "90deg",
            }}
          />
        )}
      </Button>
      {isTabsListPopupOpen && (
        <Styles.TabsListPopup
          ref={tabsListPopupRef}
          tabIndex={1}
          onFocus={() => {
            setIsTabsListPopupOpen(true);
            console.log("setIsTabsListPopupOpen(true)");
          }}
          onBlur={() => {
            setIsTabsListPopupOpen(false);
          }}
        >
          <TabsList onTabClick={tab => onTabClick(tab)} tabGroups={tabGroups} />
        </Styles.TabsListPopup>
      )}
    </Styles.TabsListButtonContainer>
  );
}
