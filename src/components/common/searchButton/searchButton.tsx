import { useAppDispatch } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Button } from "../button/button";

import { Search } from "@mui/icons-material";
export function SearchButton({
  textToSearch,
}: {
  textToSearch: string;
}): JSX.Element {
  const dispatch = useAppDispatch();

  function search() {
    dispatch(
      openTab({
        contentId: {
          type: "search",
          id: textToSearch,
          label: textToSearch,
        },
      })
    );
  }

  return (
    <Button onClick={() => search()} tooltip="Search">
      <Search />
    </Button>
  );
}
