import { useEffect, useRef } from "react";
import { Styles } from "../style";

export function InnerView({
  children,
  focusOnArgsChange,
  isDisplayed,
}: React.PropsWithChildren<{
  focusOnArgsChange: Array<unknown>;
  isDisplayed: boolean;
}>) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.focus();
  }, [ref.current, isDisplayed, ...focusOnArgsChange]);

  return (
    <Styles.InnerView tabIndex={0} ref={ref}>
      {children}
    </Styles.InnerView>
  );
}
