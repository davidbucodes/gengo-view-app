import React from "react";
import { Pagination } from "../pagination/pagination";
import { GridItem, GridItemModel } from "./gridItem";
import { Styles } from "./style";
import { Searchbox } from "../searchbox/searchbox";
import { ContentId } from "../../view/contentId";

export const Grid = React.memo(function Grid({
  items,
  gridStyle,
  onTextFilterInputChange,
}: {
  items: GridItemModel[];
  gridStyle?: boolean;
  onTextFilterInputChange?: (filterText: string) => void;
}): JSX.Element {
  return (
    <Styles.GridContainer>
      {onTextFilterInputChange && (
        <Styles.TextFilterInputContainer>
          <Searchbox
            placeholder="Filter..."
            onChange={value => {
              onTextFilterInputChange(value);
            }}
          />
        </Styles.TextFilterInputContainer>
      )}
      <Styles.Grid gridStyle={gridStyle}>
        <Pagination
          itemsInPage={250}
          items={items}
          itemsRenderer={item => (
            <GridItem
              key={
                typeof item.value === "string"
                  ? item.value
                  : (item.value as ContentId).id
              }
              item={item}
            />
          )}
        />
      </Styles.Grid>
    </Styles.GridContainer>
  );
});
