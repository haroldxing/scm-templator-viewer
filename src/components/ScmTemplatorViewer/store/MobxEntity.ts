import { makeAutoObservable } from "mobx";

import { Entity } from "../types";
import { TemplatorStore } from "./TemplatorStore";

export class MobxEntity {
  constructor(
    readonly templatorStore: TemplatorStore,
    readonly entity: Entity,
    public tepmlatorName?: string
  ) {
    makeAutoObservable(this);
  }

}