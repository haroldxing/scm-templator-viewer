export interface LookupTypeOptions {
  prefix: string;
  autoGen: boolean;
  type: string;
  defaultNumber?: number;
  numberFormat: string;
  precision?: number;
  showBarPercentage?: boolean;
  choice: string;
  useSingle?: boolean;
  useImage?: boolean;
  defaultValue: string;
  fromEntity: string;
  fromAttr: string;
}

export interface Reminder {
  type: string;
  unit: string;
  unitDuration: number;
  hour: number;
  minute: number;
  second: number;
}

export interface TypeOptions {
  prefix: string;
  autoGen: boolean;
  choice: string;
  defaultValue: string;
  dateFormat: string;
  includeTime?: boolean;
  timeFormat: string;
  useGMT?: boolean;
  useCurrentDateTime?: boolean;
  lookupAttribute: string;
  lookupColumnType: string;
  lookupTypeOptions: LookupTypeOptions;
  relation: string;
  relationType: string;
  defaultNumber?: number;
  numberFormat: string;
  precision?: number;
  showBarPercentage?: boolean;
  relationId: string;
  formula: string;
  resultType: string;
  useSingle?: boolean;
  useImage?: boolean;
  fromEntity: string;
  fromAttr: string;
  reminder: Reminder;
}

export interface Attribute {
  name: string;
  dataType: string;
  typeOptions: TypeOptions;
  sortable: boolean;
  label: string;
}

export interface Relation {
  name: string;
  label: string;
  description: string;
  kind: string;
  referenceAttr: string;
  relatedEntity: string;
  relatedAttr: string;
}

export interface Entity {
  name: string;
  description: string;
  attributes: Attribute[];
  relations: Relation[];
  label: string;
  useProject?: boolean;
}

export interface DslConfig<T = unknown> {
  type: string;
  value: T;
  attribute: string;
  valueType: string;
}

export interface View {
  name: string;
  entity: string;
  dslConfig: DslConfig;
  description: string;
  attributes: string[];
}

export interface Value {
  value: string;
  name: string;
  label: string;
  color: string;
  order: number;
}

export interface Choice {
  name: string;
  label: string;
  description: string;
  values: Value[];
}

export interface Templator {
  entities: Entity[];
  views: View[];
  choices: Choice[];
}
