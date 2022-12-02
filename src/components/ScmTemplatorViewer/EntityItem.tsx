import { FC, useState } from "react";
import { Button, Descriptions, List, Space, Tag } from "antd";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { useRootStore } from "store/RootStore";

import { EntitiesList } from "./EntitiesList";
import { Entity } from "./types";

export interface EntityItemProps {
  entity: Entity & { kind?: string };
}

export const EntityItem: FC<EntityItemProps> = observer(({ entity }) => {
  const { templatorStore } = useRootStore();
  const [showRelations, setShowRelations] = useState(false);
  const [showRAttributes, setShowRAttributes] = useState(false);
  const entities = computed(() => {
    if (!showRelations) return;
    return entity.relations
      ?.map(({ relatedEntity, kind }) => ({ ...templatorStore.entitiesByName[relatedEntity], kind }))
      .filter(it => !!it);
  }).get();
  return (
    <List.Item>
      <List.Item.Meta
        title={
          <>
            {entity.label}
            {entity.kind ?
              entity.kind === "MANY_TO_ONE" ?
                <Tag className="ml-2" color={"success"}>{entity.kind}</Tag> :
                <Tag className="ml-2" color={"processing"}>{entity.kind}</Tag>
              : null
            }
          </>
        }
        description={
          <>
            <div>{entity.name}</div>
            <div>{entity.description}</div>
          </>
        }
      />
      <Space className="mb-2">
        <Button size="small" onClick={() => setShowRelations(!showRelations)}>
          {showRelations ? "隐藏" : "显示"}关联
        </Button>
        <Button size="small" onClick={() => setShowRAttributes(!showRAttributes)}>
          {showRAttributes ? "隐藏" : "显示"}Attributes
        </Button>
      </Space>
      <div className="flex flex-col gap-2">
        {showRAttributes &&
          <Descriptions size="small" column={1}>
            {entity.attributes?.map(attr =>
              <Descriptions.Item key={attr.name} label={attr.name}>
                {attr.label}
                <Tag className="ml-2">{attr.dataType}</Tag>
              </Descriptions.Item>
            )}
          </Descriptions>
        }
        {entities &&
          <EntitiesList isChild className="bg-gray-900/5 rounded" entities={entities} />
        }
      </div>
    </List.Item>
  );
});