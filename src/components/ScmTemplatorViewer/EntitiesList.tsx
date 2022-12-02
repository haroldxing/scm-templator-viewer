import { FC } from "react";
import { List } from "antd";

import { EntityItem } from "./EntityItem";
import { Entity } from "./types";

export interface EntitiesListProps {
  className?: string;
  isChild?: boolean;
  entities: (Entity & { kind?: string })[];
}

export const EntitiesList: FC<EntitiesListProps> = ({ className, isChild, entities }) => {
  return (
    <List
      className={className}
      grid={!isChild ? { gutter: 10, column: 3 } : undefined}
      itemLayout="vertical"
      dataSource={entities}
      renderItem={(item) => <EntityItem entity={item} />}
    />
  );
};