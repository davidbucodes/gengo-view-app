import { useState } from "react";

export function useDragOver() {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragEnter = (event: React.DragEvent) => {
    setIsDragOver(true);
  };

  const onDragLeave = (event: React.DragEvent) => {
    setIsDragOver(false);
  };

  return { isDragOver, onDragEnter, onDragLeave };
}
