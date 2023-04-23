import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveTab } from "../../store/slices/tabsSlice";
import { ContentId } from "./contentId";
import { KanjiView } from "./innerView/kanjiView";
import { LevelKanjiView } from "./innerView/levelKanjiView";
import { LevelVocabularyView } from "./innerView/levelVocabularyView";
import { NameView } from "./innerView/nameView";
import { SearchView } from "./innerView/searchView";
import { SystemView } from "./innerView/system/systemView";
import { VocabularyView } from "./innerView/vocabularyView";
import { Styles } from "./style";

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

  return (
    <>
      {tabs.map(tab => {
        const { content: contentId } = tab;
        return (
          <Styles.View
            key={tab.id}
            isDisplayed={tab.id === activeTabId}
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
            {contentId?.type === "kanji" && (
              <KanjiView
                contentId={contentId as ContentId & { type: "kanji" }}
              />
            )}
            {contentId?.type === "vocabulary" && (
              <VocabularyView
                contentId={contentId as ContentId & { type: "vocabulary" }}
              />
            )}
            {contentId?.type === "name" && (
              <NameView contentId={contentId as ContentId & { type: "name" }} />
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
