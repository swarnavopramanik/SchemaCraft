import type { SchemaField } from "@/utils/types";

const generateJSON = (schema: SchemaField[]): unknown => {
  const json: Record<string, unknown> = {};

  schema.forEach((field) => {
    switch (field.type) {
      case "nested":
        json[field.key] = field.children ? generateJSON(field.children) : {};
        break;
      case "string":
        json[field.key] = "STRING";
        break;
      case "number":
        json[field.key] = "number";
        break;
      case "float":
        json[field.key] = 0.1;
        break;
      case "boolean":
        json[field.key] = true;
        break;
      case "objectid":
        json[field.key] = "OBJECT_ID";
        break;
      default:
        json[field.key] = null;
    }
  });

  return json;
};

const JSONPreview = ({ schema }: { schema: SchemaField[] }) => {
  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-xl p-5 w-[400px] max-h-[500px] overflow-auto text-sm text-black font-mono">
      <h2 className="text-base font-bold mb-2 text-gray-700">Live JSON Preview</h2>
      <pre>{JSON.stringify(generateJSON(schema), null, 2)}</pre>
    </div>
  );
};

export default JSONPreview;
