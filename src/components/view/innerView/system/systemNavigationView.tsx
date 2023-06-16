import { useAppSelector } from "../../../../store/hooks";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemNavigationView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const keyboardConfig = useAppSelector(state => state.keyboard.keyboardConfig);

  const configEntries = Object.entries(keyboardConfig);

  return (
    contentId && (
      <div>
        <Styles.Header>Navigation</Styles.Header>
        <Styles.Line>Navigation system page (Not implemented yet)</Styles.Line>
        <Styles.KeyValueTable>
          <Styles.KeyValueTableBody>
            {configEntries.map(([key, commandName]) => (
              <Styles.KeyValueRow>
                <Styles.Key>{key}</Styles.Key>
                <Styles.Value>{commandName}</Styles.Value>
              </Styles.KeyValueRow>
            ))}
          </Styles.KeyValueTableBody>
        </Styles.KeyValueTable>
      </div>
    )
  );
}
