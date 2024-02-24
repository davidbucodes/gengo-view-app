import { Styles } from "./style";

export function Button({
  text,
  tooltip,
  onClick,
  onFocus,
  children,
  tabIndex,
}: React.PropsWithChildren<{
  text?: string;
  tooltip?: string;
  onClick: () => void;
  onFocus?: () => void;
  tabIndex?: number;
}>): JSX.Element {
  return (
    <Styles.Button
      title={tooltip}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={tabIndex}
      onKeyDown={ev => {
        if (ev.code === "Enter") {
          onClick();
        }
      }}
    >
      {text}
      {children}
    </Styles.Button>
  );
}
