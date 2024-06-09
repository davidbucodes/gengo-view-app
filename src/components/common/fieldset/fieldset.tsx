import { Styles } from "./style";

export function Fieldset({
  legend,
  children,
}: React.PropsWithChildren<{ legend: string }>): JSX.Element {
  return (
    <Styles.Fieldset>
      <Styles.Legend>{legend}</Styles.Legend>
      {children}
    </Styles.Fieldset>
  );
}
