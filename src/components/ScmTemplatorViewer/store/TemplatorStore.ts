import { makeAutoObservable } from "mobx";

import { Entity } from "../types";
import { MobxEntity } from "./MobxEntity";


export class TemplatorStore {
  entitiesByName: Record<string, MobxEntity> = {};

  constructor() {
    makeAutoObservable(this);
  }

  get entities() {
    return Object.values(this.entitiesByName);
  }

  handleEntities(entities: Entity[], tepmlatorName?: string) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      this.entitiesByName[entity.name] = new MobxEntity(this, entity, tepmlatorName);
    }
  }
}