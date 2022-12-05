import { FC, useState } from "react";
import { List } from "antd";
import { observer } from "mobx-react-lite";

import { MobxEntity } from "./store/MobxEntity";
import { AttributesList } from "./AttributesList";
import { EntityItem } from "./EntityItem";

export interface EntitiesListProps {
  entities: MobxEntity[];
}

export const EntitiesList: FC<EntitiesListProps> = observer(({ entities }) => {
  const [activeEntity, setActiveEntity] = useState<MobxEntity>();

  return (
    <>
      <List
        className="max-h-screen overflow-auto w-60"
        itemLayout="vertical"
        size="small"
        dataSource={entities}
        renderItem={(item) =>
          <EntityItem
            entity={item}
            active={item === activeEntity}
            onClick={() => setActiveEntity(item)}
          />
        }
      />
      {activeEntity &&
        <AttributesList entity={activeEntity} />
      }
    </>
  );
});