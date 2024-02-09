import { useEffect, useState } from "react";
import { Styles } from "./style";

export function Section<T>({
  title,
  items,
  itemsRenderer, // TODO: Use database ids instead of objects?
  /*
maybe:

cursor: {
  resultsCount
  results until here
  getnextpage
  getbypage
}
  */
  itemsCountAtPage = 10,
  onTextFilterInputChange,
}: {
  title: string;
  items: T[];
  itemsRenderer: (item: T) => JSX.Element;
  itemsCountAtPage: number;
  onTextFilterInputChange?: (filterText: string) => void;
}) {
  const [pageNumber, setPageNumber] = useState(1);

  const numberOfPages = Math.ceil((items?.length || 0) / itemsCountAtPage);
  const isNextPageAvailable = Boolean(numberOfPages - pageNumber);
  const isPrevPageAvailable = pageNumber > 1;

  const itemsCountToRender = Math.min(
    pageNumber * itemsCountAtPage,
    items?.length || 0
  );

  useEffect(() => {
    setPageNumber(1);
  }, [items]);

  return (
    <Styles.Section>
      <Styles.Title>
        <Styles.TitleText>{title}</Styles.TitleText>
        {onTextFilterInputChange && (
          <Styles.TextFilterInput
            placeholder="Filter..."
            onChange={event => onTextFilterInputChange(event.target.value)}
          />
        )}
      </Styles.Title>
      {itemsCountToRender === 0 ? (
        <Styles.Footer>
          <Styles.Info>No {title.toLowerCase()} available</Styles.Info>
        </Styles.Footer>
      ) : (
        <>
          <Styles.Table border={1} cellPadding={15}>
            <Styles.TableBody>
              {items?.slice(0, itemsCountToRender).map(itemsRenderer)}
            </Styles.TableBody>
          </Styles.Table>
          <Styles.Footer>
            <Styles.Info>
              Showing {itemsCountToRender} of {items?.length || 0}{" "}
              {title.toLowerCase()}
            </Styles.Info>
            <Styles.Links>
              {isNextPageAvailable && (
                <Styles.Link
                  onClick={() => {
                    setPageNumber(pageNumber + 1);
                  }}
                >
                  Show more
                </Styles.Link>
              )}
              {isNextPageAvailable && isPrevPageAvailable && " | "}
              {isPrevPageAvailable && (
                <Styles.Link
                  onClick={() => {
                    setPageNumber(pageNumber - 1);
                  }}
                >
                  Show less
                </Styles.Link>
              )}
            </Styles.Links>
          </Styles.Footer>
        </>
      )}
    </Styles.Section>
  );
}
