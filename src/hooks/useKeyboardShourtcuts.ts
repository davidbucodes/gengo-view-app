import { useEffect } from "react";
import { CommandName, runCommand } from "../store/slices/commandSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const enum KeySequence {
  Space = "Space",
  Enter = "Enter",
  KeyW = "KeyW",
  ShiftKeyW = "ShiftKeyW",
  KeyS = "KeyS",
  ShiftKeyS = "ShiftKeyS",
  KeyV = "KeyV",
  ShiftKeyV = "ShiftKeyV",
  KeyF = "KeyF",
  KeyT = "KeyT",
  ShiftKeyT = "ShiftKeyT",
  ShiftEnter = "ShiftEnter",
  Digit1 = "Digit1",
  Digit2 = "Digit2",
  Digit3 = "Digit3",
  KeyA = "KeyA",
}

export type KeyboardConfig = Partial<Record<KeySequence, CommandName>>;

export function useKeyboardShortcuts() {
  const keyboardConfig = useAppSelector(state => state.keyboard.keyboardConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      console.log(event.code, (event.target as HTMLElement)?.tagName, event);

      if (
        ["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName)
      ) {
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
