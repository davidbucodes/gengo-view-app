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
      {showLatestListsInline ? (
        <ListsToggleSave contentId={contentId} inline limitLists={3} />
      ) : (
        ""
      )}
      <Button onClick={() => onClick()} tooltip={"Other lists"}>
        <PlaylistAdd />
        Other lists
      </Button>
    </span>
  );
}
