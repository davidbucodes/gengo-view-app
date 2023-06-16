import { useEffect } from "react";
import { CommandName, runCommand } from "../store/slices/commandSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const enum KeySequence {
  Space = "Space",
  Enter = "Enter",
  KeyW = "KeyW",
  ShiftKeyW = "ShiftKeyW",
}

export type KeyboardConfig = Partial<Record<KeySequence, CommandName>>;

export function useKeyboardShortcuts() {
  const keyboardConfig = useAppSelector(state => state.keyboard.keyboardConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      console.log(event.code, event);

      if (["INPUT"].includes((event.target as HTMLElement)?.tagName)) {
        return;
      }

      const sequence = [
        event.ctrlKey ? "Ctrl" : "",
        event.shiftKey ? "Shift" : "",
        event.code,
      ].join("") as KeySequence;

      if (keyboardConfig[sequence as KeySequence]) {
        dispatch(runCommand({ name: keyboardConfig[sequence as KeySequence] }));
      }
    };

    document.addEventListener("keypress", listener);

    return () => document.removeEventListener("keypress", listener);
  }, [keyboardConfig]);
}
