import { capitalize, fill, kebabCase, range, zip } from "lodash";
import { useAppSelector } from "../../../../store/hooks";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemNavigationView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const keyboardConfig = useAppSelector(state => state.keyboard.keyboardConfig);

  const configEntries = Object.entries(keyboardConfig).sort((a, b) => {
    return a[0].at(-1).localeCompare(b[0].at(-1));
  });

  configEntries.unshift([
    "AltEnter",
    "When searchbox is focused - open search tab for the typed text" as any,
  ]);

  function getKeys(sequence: string) {
    const keys = kebabCase(sequence)
      .split("-")
      .filter(i => i !== "key" && i !== "arrow");
    const keysElements = keys.map(key => (
      <Styles.KeyboardKey key={key}>{capitalize(key)}</Styles.KeyboardKey>
    ));
    const plusElements = new Array(keysElements.length - 1)
      .fill(0)
      .map((_, index) => (
        <Styles.KeyboardKeysSequencePlus key={`+${index}`}>
          +
        </Styles.KeyboardKeysSequencePlus>
      ));
    return zip(keysElements, plusElements);
  }

  return (
    contentId && (
      <div>
        <Styles.Header>Navigation</Styles.Header>
        <Styles.Line>Navigation system page</Styles.Line>
        <Styles.KeyValueTable border={5} cellPadding={15}>
          <Styles.KeyValueTableHeader>
            <Styles.KeyValueRow>
              <Styles.Key>Keyboard keys sequence</Styles.Key>
              <Styles.Value>Shortcut command</Styles.Value>
            </Styles.KeyValueRow>
          </Styles.KeyValueTableHeader>
          <Styles.KeyValueTableBody>
            {configEntries.map(([key, commandName]) => (
              <Styles.KeyValueRow key={key}>
                <Styles.Key>
                  <Styles.KeyboardKeys>{getKeys(key)}</Styles.KeyboardKeys>
                </Styles.Key>
                <Styles.Value>{commandName}</Styles.Value>
              </Styles.KeyValueRow>
            ))}
          </Styles.KeyValueTableBody>
        </Styles.KeyValueTable>
        <Styles.Line />
      </div>
    )
  );
}
