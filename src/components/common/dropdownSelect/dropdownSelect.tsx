import { Styles } from "./styles";

export function DropdownSelect<T extends string>({
  options,
  selectedOption,
  onSelected,
}: {
  options: T[];
  selectedOption: T;
  onSelected: (selectedOption: T) => void;
}) {
  return (
    <Styles.DropdownSelect
      value={selectedOption}
      onChange={asd => {
        onSelected(asd.currentTarget.value as T);
      }}
    >
      {options.map(option => (
        <Styles.DropdownOption key={option} value={option}>
          {option}
        </Styles.DropdownOption>
      ))}
    </Styles.DropdownSelect>
  );
}
