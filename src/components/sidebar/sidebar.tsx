import { useEffect, useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";
import { Side } from "../app/side";
import { Styles } from "./style";
import { WidthResizeLine } from "./widthResizeLine";

export function Sidebar({
  show,
  side,
  children,
}: React.PropsWithChildren<{ show: boolean; side: Side }>) {
  const { windowSize } = useWindowResize();

  const maxWidth = Math.max(windowSize.width * 0.4, 200);
  const minWidth = Math.max(windowSize.width * 0.08, 250);

  const [width, setWidth] = useState<number>(minWidth);

  useEffect(() => {
    if (width > maxWidth) {
      setWidth(maxWidth);
    }
    if (width < minWidth) {
      setWidth(minWidth);
    }
  }, [windowSize]);

  return (
    <>
      {side === "right" && show && (
        <WidthResizeLine
          side={side}
          onWidthChange={newWidth => setWidth(newWidth)}
          maxWidth={maxWidth}
          minWidth={minWidth}
        />
      )}
      <Styles.Sidebar side={side} displayNone={!show} width={width}>
        {children}
      </Styles.Sidebar>
      {side === "left" && show && (
        <WidthResizeLine
          side={side}
          onWidthChange={newWidth => setWidth(newWidth)}
          maxWidth={maxWidth}
          minWidth={minWidth}
        />
      )}
    </>
  );
}
