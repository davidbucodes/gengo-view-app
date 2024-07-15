import { Styles } from "./style";

export function Button({
  element,
  tooltip,
  onClick,
  onFocus,
  children,
  tabIndex,
  color,
}: React.PropsWithChildren<{
  element?: JSX.Element;
  tooltip?: string;
  onClick?: () => void;
  onFocus?: () => void;
  tabIndex?: number;
  color?: string;
}>): JSX.Element {
  return (
    <Styles.Button
      title={tooltip}
      onClick={ev => {
        ev.stopPropagation();
        onClick?.();
      }}
      onFocus={onFocus}
      tabIndex={tabIndex}
      color={color}
      onKeyDown={ev => {
        if (ev.code === "Enter") {
          onClick?.();
        }
      }}
    >
      {element}
      {children}
    </Styles.Button>
  );
}
