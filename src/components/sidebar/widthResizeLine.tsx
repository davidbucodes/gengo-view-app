import { useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";
import { Side } from "../app/side";
import { Styles } from "./style";

export function WidthResizeLine({
  onWidthChange,
  side,
  maxWidth,
  minWidth,
}: {
  onWidthChange: (width: number) => void;
  side: Side;
  maxWidth: number;
  minWidth: number;
}): JSX.Element {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lineLeft, setLineLeft] = useState<number>();

  const { windowSize } = useWindowResize();

  const onMouseMove = (event: React.MouseEvent) => {
    let newWidth: number;
    if (side === "left") {
      newWidth = Math.min(Math.max(event.clientX, minWidth), maxWidth);
      setLineLeft(newWidth);
    } else if (side === "right") {
      newWidth = Math.min(
        Math.max(windowSize.width - event.clientX, minWidth),
        maxWidth
      );
      setLineLeft(windowSize.width - newWidth);
    }
    onWidthChange(newWidth);
  };

  return (
    <>
      {!isMouseDown && (
        <Styles.WidthResizeLine
          onMouseDown={event => {
            setIsMouseDown(true);
            setLineLeft(event.clientX);
          }}
        ></Styles.WidthResizeLine>
      )}
      {isMouseDown && (
        <>
          <Styles.WidthResizeLinePlaceholder />
          <Styles.WidthResizeLine lineLeft={lineLeft}></Styles.WidthResizeLine>
          <Styles.ResizeArea
            onMouseLeave={() => {
              setIsMouseDown(false);
            }}
            onMouseMove={onMouseMove}
            onMouseUp={() => {
              setIsMouseDown(false);
            }}
          ></Styles.ResizeArea>
        </>
      )}
    </>
  );
}
