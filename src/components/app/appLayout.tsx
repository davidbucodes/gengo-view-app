import {
  IndexSearchResult,
  Jlpt,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeAllGroups,
  closeCurrentTab,
  openTab,
  setDraggedContent,
} from "../../store/slices/tabsSlice";
import { Grid } from "../common/grid/grid";
import { GridItemModel } from "../common/grid/gridItem";
import { Tree } from "../common/tree/tree";
import { Explorer } from "../explorer/explorer";
import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";
import { ContentId } from "../view/contentId";
import { Side } from "./side";
import { sidebarTree } from "./sidebarTree";
import { Styles } from "./style";
import { pickCommand } from "../../store/slices/commandSlice";
import { patchKeyboardConfig } from "../../store/slices/keyboardSlice";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShourtcuts";

export function AppLayout() {
  const dispatch = useAppDispatch();
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);

  const commandQueue = useAppSelector(state => state.command.commandQueue);

  const [kanjis, setKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  useKeyboardShortcuts();

  useEffect(() => {
    const kanjis = Jlpt.allKanji();
    setKanjis(kanjis);

    dispatch(
      patchKeyboardConfig({
        config: {
          KeyW: "Close current tab",
          ShiftKeyW: "Close all groups",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (commandQueue.includes("Close current tab")) {
      dispatch(pickCommand({ name: "Close current tab" }));
      dispatch(closeCurrentTab());
    }
    if (commandQueue.includes("Close all groups")) {
      dispatch(pickCommand({ name: "Close all groups" }));
      dispatch(closeAllGroups());
    }
  }, [commandQueue]);

  function onTreeItemSelect(treeItem: (typeof sidebarTree.items)[number]) {
    dispatch(openTab(treeItem.content));
  }

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab(contentId));
  }

  function onToggleSidebar(side: Side, isVisible: boolean): void {
    if (side === "left") {
      setIsLeftSidebarVisible(isVisible);
    } else if (side === "right") {
      setIsRightSidebarVisible(isVisible);
    }
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const gridItems: GridItemModel[] = kanjis.map(kanji => ({
    label: kanji.kanji,
    contentId: {
      dbId: kanji._id,
      dbIndex: kanji._index,
      label: kanji.kanji,
      id: kanji.kanji + kanji._id,
      type: "kanji",
    },
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: `${kanji.kanji} N${kanji.jlpt}\n${kanji.meaning[0]}\n${[
      kanji.kunReading?.[0],
      kanji.onReading?.[0],
    ]
      .filter(i => i)
      .join(" ")}`,
  }));

  return (
    <>
      <Topbar
        onToggleSidebar={onToggleSidebar}
        isRightSidebarVisible={isRightSidebarVisible}
        isLeftSidebarVisible={isLeftSidebarVisible}
      />
      <Styles.Main>
        <Sidebar show={isLeftSidebarVisible} side={"left"}>
          <Tree
            title={"Explorer"}
            treeRoot={sidebarTree}
            onSelect={onTreeItemSelect}
          />
        </Sidebar>
        <Explorer />
        <Sidebar show={isRightSidebarVisible} side={"right"}>
          <Grid items={gridItems} />
        </Sidebar>
      </Styles.Main>
    </>
  );
}
