import { capitalize } from "lodash";
import { Styles } from "./style";

function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function pickColor(str: string) {
  return `hsl(${hashCode(str) % 155}, 40%, 50%)`;
}

export function SearchResultBadge({ text }: { text: string }) {
  return (
    <Styles.SearchResultBadge backgroundColor={pickColor(text)}>
      {capitalize(text)}
    </Styles.SearchResultBadge>
  );
}
