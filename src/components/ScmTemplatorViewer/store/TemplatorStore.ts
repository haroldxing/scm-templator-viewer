import { makeAutoObservable } from "mobx";

import { Entity } from "../types";


export class TemplatorStore {
  entitiesByName: Record<string, Entity & { tepmlatorName?: string }> = {};

  constructor() {
    makeAutoObservable(this);
  }

  get entities() {
    return Object.values(this.entitiesByName);
  }

  handleEntities(entities: Entity[], tepmlatorName?: string) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      this.entitiesByName[entity.name] = { ...entity, tepmlatorName };
    }
  }
}