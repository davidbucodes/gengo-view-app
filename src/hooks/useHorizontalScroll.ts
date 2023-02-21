import { useEffect, useRef } from "react";

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const element = ref.current;

    if (element) {
      const onWheel = (event: WheelEvent) => {
        if (event.deltaY) {
          element.scrollTo({
            left: element.scrollLeft + event.deltaY * 2,
          });
        }
      };

      element.addEventListener("wheel", onWheel);

      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []);

  return ref;
}
