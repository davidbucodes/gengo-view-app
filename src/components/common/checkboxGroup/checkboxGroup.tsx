import { generateId } from "../../../store/utils/generateId";
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
        const id = generateId();
        return (
          <Styles.Checkbox key={option}>
            <Styles.CheckboxInput
              checked={isChecked}
              value={option}
              id={id}
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
            <Styles.CheckboxLabel htmlFor={id}>{option}</Styles.CheckboxLabel>
          </Styles.Checkbox>
        );
      })}
    </Styles.CheckboxGroup>
  );
}
