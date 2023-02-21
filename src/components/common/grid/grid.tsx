import React from "react";
import { Pagination } from "../pagination/pagination";
import { GridItem, GridItemModel } from "./gridItem";
import { Styles } from "./style";

export const Grid = React.memo(function Grid({
  items,
  noScroll,
  gridStyle,
}: {
  items: GridItemModel[];
  noScroll?: boolean;
  gridStyle?: boolean;
}): JSX.Element {
  return (
    <Styles.Grid gridStyle={gridStyle}>
      <Pagination
        itemsInPage={200}
        items={items}
        itemsRenderer={item => <GridItem key={item.label} item={item} />}
      />
    </Styles.Grid>
  );
});
