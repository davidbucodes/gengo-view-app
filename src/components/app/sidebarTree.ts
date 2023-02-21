import { jlptLevels } from "@gengo-view/database";
import { TreeModel } from "../common/tree/tree";
import { ContentId } from "../view/contentId";

export const sidebarTree: TreeModel<ContentId> = {
  items: jlptLevels.map(level => {
    return {
      label: `N${level}`,
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
};
