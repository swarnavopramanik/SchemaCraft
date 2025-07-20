export type FieldType = "string" | "number" | "float" | "boolean" | "objectid" | "nested";

export interface SchemaField {
  key: string;
  type: FieldType;
  children?: SchemaField[];
}
