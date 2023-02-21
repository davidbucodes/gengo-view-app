import { CSSProperties, useState } from "react";

export function useHover(
  styleOnHover: CSSProperties,
  styleOnNotHover: CSSProperties = {}
) {
  const [style, setStyle] = useState(styleOnNotHover);

  const onMouseEnter = (event: React.MouseEvent) => {
    setStyle(styleOnHover);
  };
  const onMouseLeave = (event: React.MouseEvent) => {
    setStyle(styleOnNotHover);
  };

  return { style, onMouseEnter, onMouseLeave };
}
