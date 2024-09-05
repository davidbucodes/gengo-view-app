import { ContentId, SystemContentIds } from "../../contentId";
import { SystemAboutView } from "./systemAboutView";
import { SystemExportView } from "./systemExportView";
import { SystemKanjiSearchView } from "./systemKanjiSearch/systemKanjiSearch";
import { SystemSessionsView } from "./systemSessionsView/systemSessionsView";
import { SystemNavigationView } from "./systemNavigationView";
import { SystemOptionsView } from "./systemOptionsView";
import { SystemSentenceSearchView } from "./systemSentenceSearch/systemSentenceSearch";
import { SystemTextToSpeechView } from "./systemTextToSpeechView";
import { SystemWelcomeView } from "./systemWelcomeView";
import { SystemAllListsView } from "./systemLists/systemAllListsView";
import { SystemListView } from "./systemLists/systemListView";
import { TabModel } from "../../../../store/utils/tabActions";
import { SystemFamiliarsView } from "./systemFamiliars/systemFamiliarsView";

export function SystemView({
  contentId,
  tab,
}: {
  contentId: ContentId & { type: "system" };
  tab: TabModel;
}) {
  switch (contentId.id) {
    case SystemContentIds.About:
      return <SystemAboutView contentId={contentId} />;
    case SystemContentIds.NavigationEfficiency:
      return <SystemNavigationView contentId={contentId} />;
    case SystemContentIds.Options:
      return <SystemOptionsView contentId={contentId} />;
    case SystemContentIds.Welcome:
      return <SystemWelcomeView contentId={contentId} />;
    case SystemContentIds.Export:
      return <SystemExportView contentId={contentId} />;
    case SystemContentIds.KanjiSearch:
      return <SystemKanjiSearchView />;
    case SystemContentIds.TextToSpeech:
      return <SystemTextToSpeechView contentId={contentId} />;
    case SystemContentIds.SentenceSearch:
      return <SystemSentenceSearchView />;
    case SystemContentIds.Sessions:
      return <SystemSessionsView />;
    case SystemContentIds.AllLists:
      return <SystemAllListsView />;
    case SystemContentIds.List:
      return <SystemListView tab={tab} listId={contentId.listId} />;
    case SystemContentIds.Familiars:
      return <SystemFamiliarsView />;
  }
}
