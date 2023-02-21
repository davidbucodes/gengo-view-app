import { useState } from "react";

export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);

  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);

  return { isFocused, onBlur, onFocus };
}
