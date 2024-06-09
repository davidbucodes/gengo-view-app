import {
  Database,
  IndexSearchResult,
  KanjiDocument,
  jlptLevels,
} from "@davidbucodes/gengo-view-database";
import { range } from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  openTab,
  setDraggedContent,
} from "../../../../../store/slices/tabsSlice";
import { Grid } from "../../../../common/grid/grid";
import { GridItemModel } from "../../../../common/grid/gridItem";
import { RadioGroup } from "../../../../common/radioGroup/radioGroup";
import { searchResultToContentId } from "../../../../topbar/searchbar/searchResultsToContentIds";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";
import { DropdownSelect } from "../../../../common/dropdownSelect/dropdownSelect";
import { Searchbox } from "../../../../common/searchbox/searchbox";
import { SelectRadicals } from "./selectRadicals/selectRadicals";
import { Button } from "../../../../common/button/button";
import { getAllKanjisSorted } from "../../../../../utils/getAllKanjisSorted";

const allOption = "All";

export function SystemKanjiSearchView() {
  const dispatch = useAppDispatch();
  const [selectedStrokeCount, setSelectedStrokeCount] =
    useState<string>(allOption);
  const [selectedJlptLevel, setSelectedJlptLevel] = useState<string>(allOption);
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([]);
  const [selectedAppearsAtKanji, setSelectedAppearsAtKanji] = useState<
    string[]
  >([]);
  const [isRadicalSelectOpened, setIsRadicalSelectOpened] = useState(false);

  const [kanjis, setKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  useEffect(() => {
    (async () => {
      let results =
        selectedStrokeCount === allOption
          ? await getAllKanjisSorted()
          : await Database.indices.kanjiIndex.searchNumber(
              Number(selectedStrokeCount),
              "strokeCount"
            );
      results =
        selectedJlptLevel === allOption
          ? results
          : await Database.indices.kanjiIndex.searchNumber(
              Number(selectedJlptLevel),
              "jlpt",
              results
            );
      for (const radical of selectedRadicals) {
        results = await Database.indices.kanjiIndex.searchText(radical, {
          japanese: false,
          english: false,
          scorePenalty: 0,
          documents: results,
          indexFields: ["radicals"],
        });
      }
      for (const appearsAtKanji of selectedAppearsAtKanji) {
        results = await Database.indices.kanjiIndex.searchText(appearsAtKanji, {
          japanese: false,
          english: false,
          scorePenalty: 0,
          documents: results,
          indexFields: ["appearsAtKanji"],
        });
      }

      console.log(results);

      setKanjis(results);
    })();
  }, [
    selectedStrokeCount,
    selectedRadicals,
    selectedAppearsAtKanji,
    selectedJlptLevel,
  ]);

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab({ contentId }));
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const items: GridItemModel[] = kanjis.map(kanji => ({
    label: kanji.kanji,
    value: searchResultToContentId(kanji),
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: `${kanji.kanji}${kanji.jlpt ? " N" + kanji.jlpt : ""}\n${
      kanji.meaning?.[0] ? kanji.meaning?.[0] + "\n" : ""
    }${[kanji.kun?.[0], kanji.on?.[0]].filter(i => i).join(" ")}`,
  }));

  const radicalsButtonText = isRadicalSelectOpened
    ? "Close radicals table"
    : "Open radicals table";
  return (
    <Styles.InnerView>
      <Styles.Header>Kanji search</Styles.Header>
      <Styles.Line>Search Kanji by:</Styles.Line>
      <Styles.Line>
        Strokes count:
        <DropdownSelect
          onSelected={setSelectedStrokeCount}
          options={[allOption, ...range(1, 35).map(i => i.toString())]}
          selectedOption={selectedStrokeCount}
        />
        JLPT level:
        <DropdownSelect
          onSelected={setSelectedJlptLevel}
          options={[allOption, ...jlptLevels]}
          selectedOption={selectedJlptLevel}
        />
      </Styles.Line>
      <Styles.Line>
        Radicals:
        <Searchbox
          placeholder="One or more radicals..."
          onChange={text =>
            text
              ? setSelectedRadicals(
                  text.split("").filter(i => !!i && i !== "+")
                )
              : setSelectedRadicals([])
          }
          text={selectedRadicals.join("")}
        />
        <Button
          tooltip={radicalsButtonText}
          onClick={() => setIsRadicalSelectOpened(!isRadicalSelectOpened)}
        >
          {radicalsButtonText}
        </Button>
      </Styles.Line>
      {isRadicalSelectOpened && (
        <Styles.Line>
          <Styles.GridContainer>
            <SelectRadicals
              onRadicalClick={radical =>
                setSelectedRadicals([...selectedRadicals, radical])
              }
            />
          </Styles.GridContainer>
        </Styles.Line>
      )}
      <Styles.Line>
        Appear at kanjis:
        <Searchbox
          placeholder="One or more kanjis..."
          onChange={text =>
            text
              ? setSelectedAppearsAtKanji(text.split("").filter(i => !!i))
              : setSelectedAppearsAtKanji([])
          }
        />
      </Styles.Line>
      <Styles.Line>
        <Styles.GridContainer>
          <Grid items={items} />
        </Styles.GridContainer>
      </Styles.Line>
    </Styles.InnerView>
  );
}
