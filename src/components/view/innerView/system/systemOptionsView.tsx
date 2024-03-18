import { useState } from "react";
import { CheckboxGroup } from "../../../common/checkboxGroup/checkboxGroup";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";
import {
  ConfigState,
  updateConfig,
} from "../../../../store/slices/configSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { invert } from "lodash";

type OptionTitle =
  | "Show tab history"
  | "Show kanji pinyin"
  | "Highlight word at references";

const optionTitleToConfigKey: Record<OptionTitle, keyof ConfigState> = {
  "Show tab history": "showTabHistory",
  "Show kanji pinyin": "showKanjiPinyin",
  "Highlight word at references": "highlightWordAtReferences",
};
const configKeyToOptionTitle = invert(optionTitleToConfigKey) as Record<
  keyof ConfigState,
  OptionTitle
>;

const configureableConfigKeys = Object.keys(configKeyToOptionTitle) as Array<
  keyof ConfigState
>;

export function SystemOptionsView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const dispatch = useAppDispatch();
  const config = useAppSelector(state => state.config);

  const [selectedOptionTitles, setSelectedOptionTitles] = useState<
    OptionTitle[]
  >(
    configureableConfigKeys
      .filter(key => config[key])
      .map(key => configKeyToOptionTitle[key] as OptionTitle)
  );
  const optionTitles: OptionTitle[] = [
    "Show tab history",
    "Show kanji pinyin",
    "Highlight word at references",
  ];

  return (
    contentId && (
      <div>
        <Styles.Header>Options</Styles.Header>
        <Styles.Line>
          <CheckboxGroup
            onChange={updatedSelectedOptionsTitles => {
              setSelectedOptionTitles(updatedSelectedOptionsTitles);

              const updatedConfig: Record<string, unknown> = {};
              optionTitles.reduce((reducer, title) => {
                const option = optionTitleToConfigKey[title];
                updatedConfig[option] = false;
                return reducer;
              }, updatedConfig);
              updatedSelectedOptionsTitles.reduce((reducer, title) => {
                const option = optionTitleToConfigKey[title];
                updatedConfig[option] = true;
                return reducer;
              }, updatedConfig);

              dispatch(
                updateConfig({
                  ...config,
                  ...updatedConfig,
                })
              );
            }}
            options={optionTitles}
            selectedOptions={selectedOptionTitles}
          ></CheckboxGroup>
        </Styles.Line>
      </div>
    )
  );
}
