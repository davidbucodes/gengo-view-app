import { ContentId } from "../../components/view/contentId";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { generateId } from "./generateId";
import { TabModel } from "./tabActions";

export namespace TabUtils {
  export function generateTab(
    contentId: ContentId,
    newTabId?: string,
    tabGroupId?: string
  ): TabModel {
    return {
      id: newTabId || generateId(),
      content: contentId,
      label: contentId.label,
      tooltip: capitalizeFirstLetter(contentId.type) + " - " + contentId.label,
      isPinned: false,
      tabGroupId: tabGroupId || null,
    };
  }
}
