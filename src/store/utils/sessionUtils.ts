import { ContentId } from "../../components/view/contentId";
import { generateId } from "./generateId";
import { TabGroup } from "./tabsGroupUtils";

export type SessionModel = {
  id: string;
  name?: string;
  timestamp: number;
  contentIdGroups: Array<ContentId[]>;
};

const allowedContentIdTypes = [
  "kanji",
  "name",
  "vocabulary",
  "search",
] as ContentId["type"][];

export namespace SessionUtils {
  export function sessionFromTabGroups({
    sessionName,
    tabGroups,
  }: {
    sessionName?: string;
    tabGroups: Record<string, TabGroup>;
  }): SessionModel {
    const timestamp = Date.now();
    const contentIdGroups = Object.values(tabGroups).map(tabGroup => {
      return tabGroup.openTabs
        .filter(tab => allowedContentIdTypes.includes(tab.content.type))
        .map(tab => tab.content);
    });
    const session: SessionModel = {
      id: generateId(),
      name: sessionName,
      timestamp,
      contentIdGroups,
    };
    return session;
  }

  export function dumpSessions({
    sessions,
  }: {
    sessions: SessionModel[];
  }): string {
    return JSON.stringify(sessions);
  }

  export function readSessionsDump({
    sessionsDump,
  }: {
    sessionsDump: string;
  }): SessionModel[] {
    return JSON.parse(sessionsDump);
  }
}
