import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { useState } from "react";
import { Styles } from "./style";
import { TreeItem } from "./treeItem/treeItem";

export interface TreeItemModel<T> extends TreeModel<T> {
  label: string;
  content?: T;
}

export interface TreeModel<T> {
  items?: TreeItemModel<T>[];
  defaultClose?: boolean;
}

export function Tree<T>({
  title,
  treeRoot,
  onSelect,
}: {
  title: string;
  treeRoot: TreeModel<T>;
  onSelect: (treeItem: TreeItemModel<T>) => void;
}) {
  const [areAllFolded, setAreAllFolded] = useState(false);

  return (
    <Styles.Tree>
      <Styles.TreeTopbar>
        <Styles.TreeTopbarText>{title}</Styles.TreeTopbarText>
        <Styles.TreeTopbarFoldAll
          title={"Fold all tree folders"}
          onClick={() => setAreAllFolded(true)}
        >
          <IndeterminateCheckBoxOutlinedIcon />
        </Styles.TreeTopbarFoldAll>
      </Styles.TreeTopbar>
      <Styles.TreeItems>
        {treeRoot.items.map(item => (
          <TreeItem
            treeItem={item}
            onSelect={onSelect}
            key={item.label}
            level={0}
            onOpenFolder={() => setAreAllFolded(false)}
            areAllFolded={areAllFolded}
          />
        ))}
      </Styles.TreeItems>
    </Styles.Tree>
  );
}
