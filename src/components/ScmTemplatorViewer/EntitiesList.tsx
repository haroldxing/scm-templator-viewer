import { FC, useState } from "react";
import { List } from "antd";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useRootStore } from "store/RootStore";

import { MobxEntity } from "./store/MobxEntity";
import { AttributeItem } from "./AttributeItem";
import { EntityItem } from "./EntityItem";
import { Attribute } from "./types";

export interface EntitiesListProps {
  className?: string;
  isChild?: boolean;
  entities: MobxEntity[];
}

export const EntitiesList: FC<EntitiesListProps> = observer(({ isChild, entities }) => {
  const { templatorStore } = useRootStore();
  const [activeEntity, setActiveEntity] = useState<MobxEntity>();
  const [activeAttribute, setActiveAttribute] = useState<Attribute>();

  const relationEntities = computed(() => {
    if (!activeEntity) return;
    if (!activeAttribute) return;
    return activeEntity.relationByAttributeName[activeAttribute.name]?.map(relation =>
      templatorStore.entitiesByName[relation.relatedEntity]
    );
  }).get();

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
      {activeEntity?.entity.attributes &&
        <List
          className="max-h-screen overflow-auto w-60"
          itemLayout="vertical"
          size="small"
          dataSource={activeEntity?.entity.attributes}
          renderItem={item =>
            <AttributeItem
              attribute={item}
              active={item === activeAttribute}
              onClick={() => setActiveAttribute(item)}
            />
          }
        />
      }
      {relationEntities &&
        <EntitiesList entities={relationEntities} />
      }
    </>
  );
});