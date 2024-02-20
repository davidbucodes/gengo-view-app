import React from "react";
import { Pagination } from "../pagination/pagination";
import { GridItem, GridItemModel } from "./gridItem";
import { Styles } from "./style";

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
        <Styles.TextFilterInput
          placeholder="Filter..."
          onChange={event => onTextFilterInputChange(event.target.value)}
        />
      )}
      <Styles.Grid gridStyle={gridStyle}>
        <Pagination
          itemsInPage={250}
          items={items}
          itemsRenderer={item => <GridItem key={item.label} item={item} />}
        />
      </Styles.Grid>
    </Styles.GridContainer>
  );
});
