import { Styles } from "./style";

export function Searchbox({
  text,
  placeholder,
  onChange,
  tabIndex,
  secondaryText,
  secondaryPlaceholder,
  useSecondaryFilter,
  onSecondaryChange,
}: React.PropsWithChildren<{
  text?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  tabIndex?: number;
  secondaryText?: string;
  secondaryPlaceholder?: string;
  useSecondaryFilter?: boolean;
  onSecondaryChange?: (value: string) => void;
}>): JSX.Element {
  return (
    <>
      <Styles.Searchbox
        placeholder={placeholder}
        type="search"
        tabIndex={tabIndex}
        onKeyDown={ev => {
          if (ev.code === "Escape") {
            ev.preventDefault();
            ev.currentTarget.blur();
          }
        }}
        onChange={ev => {
          onChange?.(ev.currentTarget.value);
        }}
        defaultValue={text}
      />
      {text && useSecondaryFilter && (
        <Styles.Searchbox
          placeholder={secondaryPlaceholder}
          type="search"
          tabIndex={tabIndex}
          onKeyDown={ev => {
            if (ev.code === "Escape") {
              ev.preventDefault();
              ev.currentTarget.blur();
            }
          }}
          onChange={ev => {
            onSecondaryChange?.(ev.currentTarget.value);
          }}
          defaultValue={secondaryText}
        />
      )}
    </>
  );
}
