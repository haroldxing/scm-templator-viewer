import { FC } from "react";
import { List } from "antd";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

import { Attribute } from "./types";

export interface AttributeItemProps {
  attribute: Attribute;
  active?: boolean;
  onClick?: () => void;
}

export const AttributeItem: FC<AttributeItemProps> = observer(({ attribute, active, onClick }) => {
  return (
    <List.Item
      className={classNames([
        "cursor-pointer",
        active && "bg-zinc-200"
      ])}
      onClick={onClick}
    >
      <List.Item.Meta
        title={attribute.label}
        description={attribute.name}
      />
    </List.Item>
  );
});