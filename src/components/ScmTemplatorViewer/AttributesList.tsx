import { FC, useState } from "react";
import { List } from "antd";
import classNames from "classnames";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useRootStore } from "store/RootStore";

import { MobxEntity } from "./store/MobxEntity";
import { Attribute, Relation } from "./types";

export interface AttributesListProps {
  entity: MobxEntity;
  relation?: Relation;
}

export const AttributesList: FC<AttributesListProps> = observer(({ entity, relation }) => {
  const [activeAttribute, setActiveAttribute] = useState<Attribute>();
  const { templatorStore } = useRootStore();
  const relationEntity = computed(() => {
    if (!activeAttribute) return;
    const relation = entity.entity.relations?.find(relation => relation.referenceAttr === activeAttribute.name);
    return relation && templatorStore.entitiesByName[relation.relatedEntity];
  }).get();

  return (
    <>
      {entity?.entity.attributes &&
        <List
          className="max-h-screen overflow-auto w-60"
          itemLayout="vertical"
          size="small"
          dataSource={entity?.entity.attributes}
          header={<div className="px-2">{entity.entity.label}</div>}
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