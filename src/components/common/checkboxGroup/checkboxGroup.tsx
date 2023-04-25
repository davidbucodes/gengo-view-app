import { Styles } from "./styles";

export function CheckboxGroup<T extends string>({
  options,
  selectedOptions,
  onChange,
}: {
  options: T[];
  selectedOptions: T[];
  onChange: (selectedOptions: T[]) => void;
}) {
  return (
    <Styles.CheckboxGroup>
      {options.map(option => {
        const isChecked = selectedOptions.includes(option);
        return (
          <Styles.Checkbox key={option}>
            <Styles.CheckboxInput
              checked={isChecked}
              value={option}
              id={option}
              onChange={e => {
                const option = e.target.value as T;
                if (isChecked) {
                  onChange(
                    selectedOptions.filter(
                      selectedOption => selectedOption !== option
                    )
                  );
                } else {
                  onChange([...selectedOptions, option]);
                }
              }}
            />
            <Styles.CheckboxLabel htmlFor={option}>
              {option}
            </Styles.CheckboxLabel>
          </Styles.Checkbox>
        );
      })}
    </Styles.CheckboxGroup>
  );
}