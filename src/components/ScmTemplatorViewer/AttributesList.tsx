import { FC, useState } from "react";
import { List } from "antd";
import classNames from "classnames";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useRootStore } from "store/RootStore";

import { MobxEntity } from "./store/MobxEntity";
import { Attribute } from "./types";

export interface AttributesListProps {
  entity: MobxEntity;
}
export const AttributesList: FC<AttributesListProps> = observer(({ entity }) => {
  const [activeAttribute, setActiveAttribute] = useState<Attribute>();
  const { templatorStore } = useRootStore();
  const relationEntity = computed(() => {
    if (!activeAttribute) return;
    const relation = entity.entity.relations.find(relation => relation.referenceAttr === activeAttribute.name);
    return relation && templatorStore.entitiesByName[relation.relatedEntity];
  }).get();

  return (
    <>
      {entity?.entity.attributes &&
        <List
          className="max-h-screen overflow-auto w-60"
          itemLayout="vertical"
          size="small"
          header={entity.entity.label}
          dataSource={entity?.entity.attributes}
          renderItem={item =>
            <List.Item
              className={classNames([
                "cursor-pointer",
                activeAttribute === item && "bg-zinc-200"
              ])}
              onClick={() => setActiveAttribute(item)}
            >
              <List.Item.Meta title={item.label} description={item.name} />
            </List.Item>
          }
        />
      }
      {relationEntity &&
        <AttributesList entity={relationEntity} />
      }
    </>
  );
});