import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveTab } from "../../store/slices/tabsSlice";
import { ContentId } from "./contentId";
import { ContentBreadcrumbs } from "./innerView/contentBreadcrumbs/contentBreadcrumbs";
import { KanjiView } from "./innerView/kanjiView";
import { LevelKanjiView } from "./innerView/levelKanjiView";
import { LevelVocabularyView } from "./innerView/levelVocabularyView";
import { NameView } from "./innerView/nameView";
import { SearchView } from "./innerView/search/searchView";
import { SystemView } from "./innerView/system/systemView";
import { VocabularyView } from "./innerView/vocabularyView";
import { Styles } from "./style";

const viewsWithContentBreadcrumbs: ContentId["type"][] = [
  "kanji",
  "name",
  "vocabulary",
];

export function View({ tabGroupId }: { tabGroupId: string }) {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(state => {
    return state.tabs.tabGroups[tabGroupId]?.openTabs;
  });
  const activeTabId = useAppSelector(state => {
    const activeTabId = state.tabs.tabGroups[tabGroupId]?.activeTabQueue.at(-1);
    const activeTab = state.tabs.tabGroups[tabGroupId]?.openTabs.find(
      tab => tab.id === activeTabId
    );
    return activeTab?.id;
  });
  const showContentBreadcrumbs = useAppSelector(state => {
    return state.config.showTabHistory;
  });

  return (
    <>
      {tabs.map(tab => {
        const { content: contentId } = tab;
        const displayBreadcrumbs =
          showContentBreadcrumbs &&
          viewsWithContentBreadcrumbs.includes(contentId?.type) &&
          Boolean(tab.previousContentIds.length);
        const isDisplayed = tab.id === activeTabId;
        return (
          <Styles.View
            key={tab.id}
            style={{ flexDirection: displayBreadcrumbs ? "column" : "row" }}
            isDisplayed={isDisplayed}
            onDragOver={event => {
              event.preventDefault();
              return;
            }}
            onAuxClick={() => {
              dispatch(setActiveTab(tab));
            }}
            onClick={() => {
              dispatch(setActiveTab(tab));
            }}
          >
            {displayBreadcrumbs && (
              <ContentBreadcrumbs contentIds={tab.previousContentIds} />
            )}
            {contentId?.type === "kanji" && (
              <KanjiView
                isDisplayed={isDisplayed}
                contentId={contentId as ContentId & { type: "kanji" }}
                previousContentIds={[...tab.previousContentIds, contentId]}
              />
            )}
            {contentId?.type === "vocabulary" && (
              <VocabularyView
                isDisplayed={isDisplayed}
                contentId={contentId as ContentId & { type: "vocabulary" }}
                previousContentIds={[...tab.previousContentIds, contentId]}
              />
            )}
            {contentId?.type === "name" && (
              <NameView
                isDisplayed={isDisplayed}
                contentId={contentId as ContentId & { type: "name" }}
                previousContentIds={[...tab.previousContentIds, contentId]}
              />
            )}
            {contentId?.type === "level_kanji" && (
              <LevelKanjiView
                contentId={contentId as ContentId & { type: "level_kanji" }}
              />
            )}
            {contentId?.type === "level_vocabulary" && (
              <LevelVocabularyView
                contentId={
                  contentId as ContentId & { type: "level_vocabulary" }
                }
              />
            )}
            {contentId?.type === "system" && (
              <SystemView
                tab={tab}
                contentId={contentId as ContentId & { type: "system" }}
              />
            )}
            {contentId?.type === "search" && (
              <SearchView
                contentId={contentId as ContentId & { type: "search" }}
              />
            )}
          </Styles.View>
        );
      })}
    </>
  );
}
