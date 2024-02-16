import { jlptLevels } from "@davidbucodes/gengo-view-database";
import { TreeModel } from "../common/tree/tree";
import { ContentId, SystemContentIds } from "../view/contentId";

export const sidebarTree: TreeModel<ContentId> = {
  items: [
    {
      label: "Pages",
      items: [
        {
          label: "Welcome page",
          content: {
            label: "Welcome page",
            type: "system",
            id: SystemContentIds.Welcome,
          },
        },
        {
          label: "Navigation",
          content: {
            label: "Navigation",
            type: "system",
            id: SystemContentIds.NavigationEfficiency,
          },
        },
        {
          label: "About",
          content: {
            label: "About",
            type: "system",
            id: SystemContentIds.About,
          },
        },
        ,
        {
          label: "Text-to-speech",
          content: {
            label: "Text-to-speech",
            type: "system",
            id: SystemContentIds.TextToSpeech,
          },
        },
      ],
    },
    {
      label: "JLPT",
      items: [
        ...jlptLevels.map(level => {
          return {
            label: `JLPT N${level}`,
            defaultClose: true,
            items: [
              {
                label: "Kanji",
                content: {
                  type: "level_kanji",
                  id: level,
                  label: `N${level} Kanji`,
                } as ContentId,
              },
              {
                label: "Vocabulary",
                content: {
                  type: "level_vocabulary",
                  id: level,
                  label: `N${level} Vocabulary`,
                } as ContentId,
              },
            ],
          };
        }),
      ],
    },
  ],
};
