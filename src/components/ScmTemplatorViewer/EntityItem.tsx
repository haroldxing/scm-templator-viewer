import { FC } from "react";
import { List } from "antd";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

import { MobxEntity } from "./store/MobxEntity";

export interface EntityItemProps {
  entity: MobxEntity;
  active?: boolean;
  onClick?: () => void;
}

export const EntityItem: FC<EntityItemProps> = observer(({ entity, active, onClick }) => {
  return (
    <List.Item
      className={classNames([
        "cursor-pointer",
        active && "bg-zinc-200"
      ])}
      onClick={onClick}
    >
      <List.Item.Meta
        title={
          <>
            {entity.entity.label}
          </>
        }
        description={
          <>
            <div>{entity.entity.name}</div>
            <div>{entity.entity.description}</div>
          </>
        }
      />
    </List.Item>
  );
});