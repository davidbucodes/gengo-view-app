import React from "react";
import { Pagination } from "../pagination/pagination";
import { GridItem, GridItemModel } from "./gridItem";
import { Styles } from "./style";

export const Grid = React.memo(function Grid({
  items,
  gridStyle,
}: {
  items: GridItemModel[];
  gridStyle?: boolean;
}): JSX.Element {
  return (
    <Styles.Grid gridStyle={gridStyle}>
      <Pagination
        itemsInPage={250}
        items={items}
        itemsRenderer={item => <GridItem key={item.label} item={item} />}
      />
    </Styles.Grid>
  );
});
