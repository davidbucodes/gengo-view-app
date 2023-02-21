import { useEffect, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export function useWindowResize(): { windowSize: Size } {
  const [windowSize, setWindowSize] = useState<Size>({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });

  useEffect(() => {
    const eventListener = () => {
      setWindowSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    };
    window.addEventListener("resize", eventListener);
    return () => window.removeEventListener("resize", eventListener);
  }, []);

  return { windowSize };
}
