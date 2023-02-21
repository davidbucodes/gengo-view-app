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

export function ContentIdBadge({
  tabContentType: tabType,
}: {
  tabContentType: string;
}) {
  return (
    <Styles.ContentIdBadge backgroundColor={pickColor(tabType)}>
      {tabType?.[0]?.toUpperCase()}
    </Styles.ContentIdBadge>
  );
}
