import { Button} from "./../components/ui/button";
import type { SchemaField } from "@/utils/types";
import FieldItem from "./FieldItem";
import JSONPreview from "./JSONPreview";
import { useState } from "react";

const SchemaBuilder = () => {
  const [schema, setSchema] = useState<SchemaField[]>([]);

  const updateSchema = (updated: SchemaField[]) => {
    setSchema(updated);
  };

  return (
    <div className="p-6 flex flex-wrap md:flex-nowrap gap-6">
      <div className="flex-4 space-y-2">
        {schema.map((field, index) => (
          <FieldItem
            key={index}
            index={index}
            field={field}
            onChange={(updatedField) => {
              const updated = [...schema];
              updated[index] = updatedField;
              updateSchema(updated);
            }}
            onDelete={() => {
              const updated = schema.filter((_, i) => i !== index);
              updateSchema(updated);
            }}
          />
        ))}
        <Button onClick={() => setSchema([...schema, { key: "", type: "string" }])}>
          + Add Field
        </Button>
      </div>

      <div className="w-full md:w-1/3">
        <JSONPreview schema={schema} />
      </div>
    </div>
  );
};

export default SchemaBuilder;