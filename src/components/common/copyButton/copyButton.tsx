import { Button } from "../button/button";
import { ContentCopy } from "@mui/icons-material";

export function CopyButton({
  textToCopy,
}: {
  textToCopy: string;
}): JSX.Element {
  return (
    <Button
      onClick={() => navigator.clipboard.writeText(textToCopy)}
      tooltip="Copy"
    >
      <ContentCopy />
    </Button>
  );
}
