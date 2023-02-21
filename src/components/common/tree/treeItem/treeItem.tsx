import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { TreeItemModel } from "../tree";
import { Styles } from "./style";

export function TreeItem<T>({
  treeItem,
  onSelect,
  level,
  onOpenFolder,
  areAllFolded,
}: {
  treeItem: TreeItemModel<T>;
  level: number;
  onSelect: (treeItem: TreeItemModel<T>) => void;
  onOpenFolder: () => void;
  areAllFolded: boolean;
}) {
  const [isFolded, setIsFolded] = useState(false);

  useEffect(() => {
    if (areAllFolded) {
      setIsFolded(areAllFolded);
    }
  }, [areAllFolded]);

  return (
    <Styles.TreeItemWrapper>
      <Styles.TreeItem
        level={level}
        tabIndex={0}
        key={treeItem.label}
        onClick={event => {
          event.stopPropagation();
          if (treeItem.items?.length > 0) {
            if (isFolded) {
              onOpenFolder();
            }
            setIsFolded(!isFolded);
          } else {
            onSelect(treeItem);
          }
        }}
      >
        {treeItem.items?.length > 0 && (
          <Styles.TreeItemFoldIcon
            onClick={event => {
              event.stopPropagation();
              if (isFolded) {
                onOpenFolder();
              }
              setIsFolded(!isFolded);
            }}
          >
            {isFolded ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </Styles.TreeItemFoldIcon>
        )}
        {treeItem.label && (
          <Styles.TreeItemText>{treeItem.label}</Styles.TreeItemText>
        )}
      </Styles.TreeItem>

      {!isFolded &&
        treeItem.items?.map(item => (
          <TreeItem
            treeItem={item}
            onSelect={onSelect}
            key={item.label}
            level={level + 1}
            onOpenFolder={onOpenFolder}
            areAllFolded={areAllFolded}
          />
        ))}
    </Styles.TreeItemWrapper>
  );
}
