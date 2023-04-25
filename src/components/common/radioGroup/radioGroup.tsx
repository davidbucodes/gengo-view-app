import { Styles } from "./styles";

export function RadioGroup<T extends string>({
  options,
  selectedOption,
  onSelected,
  direction = "column",
}: {
  options: T[];
  selectedOption: T;
  onSelected: (selectedOption: T) => void;
  direction?: "row" | "column";
}) {
  return (
    <Styles.RadioGroup direction={direction}>
      {options.map(option => (
        <Styles.RadioButton key={option}>
          <Styles.RadioButtonInput
            checked={option === selectedOption}
            value={option}
            id={option}
            onChange={e => onSelected(e.target.value as T)}
          />
          <Styles.RadioButtonLabel htmlFor={option}>
            {option}
          </Styles.RadioButtonLabel>
        </Styles.RadioButton>
      ))}
    </Styles.RadioGroup>
  );
}
