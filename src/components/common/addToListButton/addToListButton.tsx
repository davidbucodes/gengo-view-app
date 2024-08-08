import { Button } from "../button/button";

import { PlaylistAdd } from "@mui/icons-material";
import { ListsToggleSave } from "../listsToggleSave/listsToggleSave";
import { ContentId } from "../../view/contentId";
export function AddToListButton({
  onClick,
  contentId,
  showLatestListsInline = true,
}: {
  onClick: () => void;
  contentId: ContentId;
  showLatestListsInline?: boolean;
}): JSX.Element {
  return (
    <span>
      <Button onClick={() => onClick()} tooltip="Add to list">
        <PlaylistAdd />
      </Button>
      {showLatestListsInline ? (
        <ListsToggleSave contentId={contentId} inline limitLists={3} />
      ) : (
        ""
      )}
    </span>
  );
}
