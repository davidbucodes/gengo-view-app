import { split } from "lodash";
import { Styles } from "../components/view/contentReferences/style";

export function highlightEntry(
  text: string,
  entry: string,
  secondEntry?: string
): JSX.Element {
  return (
    <>
      {split(text, entry)
        .flatMap((p, index) => [
          !secondEntry ? p : higlightSecondEntry(p, secondEntry),
          <Styles.Mark key={index}>{entry}</Styles.Mark>,
        ])
        .slice(0, -1)}
    </>
  );
}

function higlightSecondEntry(text: string, secondEntry: string): JSX.Element {
  return (
    <>
      {split(text, secondEntry)
        .flatMap(p => [
          p,
          <Styles.MarkSecondary>{secondEntry}</Styles.MarkSecondary>,
        ])
        .slice(0, -1)}
    </>
  );
}
