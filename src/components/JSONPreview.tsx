import type { SchemaField } from "@/utils/types";

const generateJSON = (schema: SchemaField[]): unknown => {
  const json: Record<string, unknown> = {};
  schema.forEach((field) => {
    if (field.type === "nested" && field.children) {
      json[field.key] = generateJSON(field.children);
    } else if (field.type === "string") {
      json[field.key] = "STRING";
    } else if (field.type === "number") {
      json[field.key] = "number";
    }
  });
  return json;
};

const JSONPreview = ({ schema }: { schema: SchemaField[] }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow w-[400px] overflow-auto">
      <pre>{JSON.stringify(generateJSON(schema), null, 2)}</pre>
    </div>
  );
};

export default JSONPreview;
