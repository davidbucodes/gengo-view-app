import { Styles } from "./style";

export function Searchbox({
  text,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  tabIndex,
  secondaryText,
  secondaryPlaceholder,
  useSecondaryFilter,
  onSecondaryChange,
  autoFocus,
}: React.PropsWithChildren<{
  text?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  tabIndex?: number;
  secondaryText?: string;
  secondaryPlaceholder?: string;
  useSecondaryFilter?: boolean;
  onSecondaryChange?: (value: string) => void;
  autoFocus?: true;
}>): JSX.Element {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1ch",
      }}
    >
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
        value={text}
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
          autoFocus={autoFocus}
        />
      )}
    </div>
  );
}
