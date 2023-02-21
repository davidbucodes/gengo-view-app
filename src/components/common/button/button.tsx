import { Styles } from "./style";

export function Button({
  text,
  tooltip,
  onClick,
  children,
}: React.PropsWithChildren<{
  text?: string;
  tooltip?: string;
  onClick: () => unknown;
}>): JSX.Element {
  return (
    <Styles.Button title={tooltip} onClick={onClick}>
      {text}
      {children}
    </Styles.Button>
  );
}
