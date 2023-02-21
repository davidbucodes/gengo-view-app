import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import { Styles } from "./style";

export function Pagination<T>({
  items,
  itemsRenderer,
  itemsInPage,
}: {
  items: T[];
  itemsRenderer: (item: T) => JSX.Element;
  itemsInPage: number;
}) {
  const firstPage = 1;
  const listInnerRef = useRef();
  const [visiblePage, setVisiblePage] = useState(firstPage);
  const [itemsToRender, setItemsToRender] = useState<T[]>([]);
  const [isScrollPaginationBlocked, setIsScrollPaginationBlocked] =
    useState(false);

  useEffect(() => {
    const nextPageItemsIndex = (visiblePage + 1) * itemsInPage;
    const toRender = items.slice(0, nextPageItemsIndex + itemsInPage);
    setItemsToRender(toRender);
  }, [items, visiblePage]);

  function scrollToNextPage() {
    if (isScrollPaginationBlocked) {
      return;
    }

    setIsScrollPaginationBlocked(true);
    setTimeout(() => setIsScrollPaginationBlocked(false), 300);
    const lastPage = Math.ceil(items.length / itemsInPage);
    setVisiblePage(Math.min(visiblePage + 1, lastPage));
  }

  const onScroll = () => {
    if (isScrollPaginationBlocked) {
      return;
    }

    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - scrollHeight / 10) {
        scrollToNextPage();
      }
    }
  };

  return (
    <Styles.Pagination onScroll={onScroll} ref={listInnerRef}>
      {itemsToRender.map(itemsRenderer)}
      {itemsToRender.length !== items.length && (
        <Styles.LoaderWrapper>
          <CircularProgress />
        </Styles.LoaderWrapper>
      )}
    </Styles.Pagination>
  );
}
