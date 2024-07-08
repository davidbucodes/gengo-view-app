import { Styles } from "./style";

function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) * 1024 + ((hash << 10) - hash);
  }
  return hash;
}

function pickColor(str: string) {
  return `hsl(${hashCode(str) % 155}, 40%, 50%)`;
}

export function Badge({
  text,
  textToColor,
}: {
  text: string;
  textToColor: string;
}) {
  return (
    <Styles.Badge backgroundColor={pickColor(textToColor)}>
      {text.toUpperCase()}
    </Styles.Badge>
  );
}
