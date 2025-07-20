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
    <div className="p-8 flex flex-wrap md:flex-nowrap gap-8">
      <div className="flex-4 space-y-4 w-full md:w-1/3">
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
        <Button 
        onClick={() => setSchema([...schema, { key: "", type: "string" }])}
          className="bg-black hover:bg-purple-800 text-white"
          >
          + Add Field
        </Button>
        <div className="flex gap-3">
        <Button
    onClick={() => {
      console.log("Submit clicked");
    }}
    className="bg-green-600 hover:bg-green-700 text-white"
  >
    Submit
  </Button>
      </div>
      </div>

      <div className="w-full md:w-1/3">
        <JSONPreview schema={schema} />
      </div>
    </div>
  );
};

export default SchemaBuilder;