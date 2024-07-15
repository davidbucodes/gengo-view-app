import { IndexName, JlptLevel } from "@davidbucodes/gengo-view-database";

export const enum SystemContentIds {
  About = "About",
  Welcome = "Welcome to GengoView!",
  Options = "Options",
  NavigationEfficiency = "Navigation Efficiency",
  Export = "Export",
  KanjiSearch = "Kanji Search",
  TextToSpeech = "Text-to-speech",
  SentenceSearch = "Sentence Search",
  Sessions = "Sessions",
}

export type ContentId =
  | {
      id: string;
      label: string;
      type: "search";
    }
  | {
      id: SystemContentIds;
      label: string;
      type: "system";
    }
  | {
      id: JlptLevel;
      label: string;
      type: "level_kanji";
    }
  | {
      id: JlptLevel;
      label: string;
      type: "level_vocabulary";
    }
  | {
      id: string;
      type: IndexName;
      label: string;
      dbId: number;
      dbIndex: IndexName;
    };
