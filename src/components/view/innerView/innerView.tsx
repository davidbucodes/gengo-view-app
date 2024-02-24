import { useEffect, useRef } from "react";
import { Styles } from "../style";

export function InnerView({
  children,
  focusOnArgsChange: focusOnChange,
  isDisplayed,
}: React.PropsWithChildren<{
  focusOnArgsChange: Array<unknown>;
  isDisplayed: boolean;
}>) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.focus();
  }, [ref.current, isDisplayed, ...focusOnChange]);
  ref.current?.focus();

  return (
    <Styles.InnerView tabIndex={0} ref={ref}>
      {children}
    </Styles.InnerView>
  );
}
