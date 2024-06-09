import {
  IndexSearchResult,
  Jlpt,
  KanjiDocument,
  Database,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeAllGroups,
  closeCurrentTab,
  focusNextTabInGroup,
  focusPreviousTabInGroup,
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
import { searchResultToContentId } from "../topbar/searchbar/searchResultsToContentIds";
import { getAllKanjisSorted, sortKanjis } from "../../utils/getAllKanjisSorted";

export function AppLayout() {
  const dispatch = useAppDispatch();
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);

  const commandQueue = useAppSelector(state => state.command.commandQueue);

  const [kanjis, setKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  const [filteredKanjis, setFilteredKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  useKeyboardShortcuts();

  async function openFirstVocabResultOrSearchTab(copiedText: string) {
    const results = await Database.indices.vocabularyIndex.searchText(
      copiedText,
      {
        english: true,
        japanese: true,
        scorePenalty: 0,
        sortByScore: true,
      }
    );

    if (results.length) {
      dispatch(
        openTab({
          contentId: {
            ...searchResultToContentId(results[0]),
          },
        })
      );
    } else {
      dispatch(
        openTab({
          contentId: {
            type: "search",
            id: copiedText,
            label: copiedText,
          },
        })
      );
    }
  }

  useEffect(() => {
    (async () => {
      const kanjis = await getAllKanjisSorted("jlpt");
      setKanjis(kanjis);
      setFilteredKanjis(kanjis);
    })();

    dispatch(
      patchKeyboardConfig({
        config: {
          KeyW: "Close current tab",
          ShiftKeyW: "Close all tab groups",
          KeyS: "Search selected text",
          ShiftKeyS: "Search selected text - first vocabulary or open search",
          KeyV: "Search copied text",
          ShiftKeyV: "Search copied text - first vocabulary or open search",
          KeyT: "Focus next tab in group",
          ShiftKeyT: "Focus previous tab in group",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (commandQueue.includes("Close current tab")) {
      dispatch(pickCommand({ name: "Close current tab" }));
      dispatch(closeCurrentTab());
    }
    if (commandQueue.includes("Close all tab groups")) {
      dispatch(pickCommand({ name: "Close all tab groups" }));
      dispatch(closeAllGroups());
    }
    if (commandQueue.includes("Search selected text")) {
      dispatch(pickCommand({ name: "Search selected text" }));

      const selectedText = window.getSelection().toString().trim();

      if (!selectedText) {
        return;
      }

      dispatch(
        openTab({
          contentId: {
            type: "search",
            id: selectedText.toString(),
            label: selectedText.toString(),
          },
        })
      );
    }
    if (
      commandQueue.includes(
        "Search selected text - first vocabulary or open search"
      )
    ) {
      dispatch(
        pickCommand({
          name: "Search selected text - first vocabulary or open search",
        })
      );

      (async () => {
        const selectedText = window.getSelection().toString().trim();

        if (!selectedText) {
          return;
        }

        await openFirstVocabResultOrSearchTab(selectedText);
      })();
    }
    if (commandQueue.includes("Search copied text")) {
      dispatch(pickCommand({ name: "Search copied text" }));

      (async () => {
        const copiedText = (await navigator.clipboard.readText()).trim();

        if (!copiedText) {
          return;
        }

        dispatch(
          openTab({
            contentId: {
              type: "search",
              id: copiedText,
              label: copiedText,
            },
          })
        );
      })();
    }
    if (
      commandQueue.includes(
        "Search copied text - first vocabulary or open search"
      )
    ) {
      dispatch(
        pickCommand({
          name: "Search copied text - first vocabulary or open search",
        })
      );

      (async () => {
        const copiedText = (await navigator.clipboard.readText()).trim();

        if (!copiedText) {
          return;
        }

        await openFirstVocabResultOrSearchTab(copiedText);
      })();
    }
    if (commandQueue.includes("Focus next tab in group")) {
      dispatch(pickCommand({ name: "Focus next tab in group" }));
      dispatch(focusNextTabInGroup());
    }
    if (commandQueue.includes("Focus previous tab in group")) {
      dispatch(pickCommand({ name: "Focus previous tab in group" }));
      dispatch(focusPreviousTabInGroup());
    }
  }, [commandQueue]);

  function onTreeItemSelect(treeItem: (typeof sidebarTree.items)[number]) {
    dispatch(openTab({ contentId: treeItem.content }));
  }

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab({ contentId }));
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

  function getKanjiTooltip(kanji: IndexSearchResult<KanjiDocument>): string {
    return `${kanji.kanji}${kanji.jlpt ? " N" + kanji.jlpt : ""}${
      kanji.meaning?.[0] ? "\n" + kanji.meaning?.[0] : ""
    }\n${[kanji.kun?.[0], kanji.on?.[0]].filter(i => i).join(" ")}`;
  }

  const gridItems: GridItemModel[] = filteredKanjis.map(kanji => ({
    label: kanji.kanji,
    value: {
      dbId: kanji._id,
      dbIndex: kanji._index,
      label: kanji.kanji,
      id: kanji.kanji + kanji._id,
      type: "kanji",
    },
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: getKanjiTooltip(kanji),
  }));

  function onGridTextFilterInputChange(filterText: string): void {
    (async function () {
      if (filterText) {
        const filtered = (await Database.termsIndices.searchText(filterText, {
          documents: kanjis,
          termIndices: ["kanji"],
          addKanji: false,
          addKanjiAtBottom: false,
        })) as IndexSearchResult<KanjiDocument>[];
        setFilteredKanjis(sortKanjis(filtered, "jlpt"));
      } else {
        const allKanjisSorted = await getAllKanjisSorted("jlpt");
        console.log(allKanjisSorted);
        setFilteredKanjis(allKanjisSorted);
      }
    })();
  }

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
          <Grid
            items={gridItems}
            onTextFilterInputChange={onGridTextFilterInputChange}
          />
        </Sidebar>
      </Styles.Main>
    </>
  );
}
