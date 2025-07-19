export type FieldType = "string" | "number" | "nested" | "boolean" | "any";

export interface SchemaField {
  key: string;
  type: FieldType;
  children?: SchemaField[];
}
