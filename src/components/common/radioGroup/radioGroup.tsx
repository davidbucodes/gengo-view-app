import { Styles } from "./styles";

export function RadioGroup<T extends string>({
  options,
  selectedOption,
  onSelected,
}: {
  options: T[];
  selectedOption: T;
  onSelected: (selectedOption: T) => void;
}) {
  return (
    <Styles.RadioGroup>
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
