import React from "react"; 
import { Input } from "./../components/ui/input"; 
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import type { SchemaField } from "@/utils/types";

interface FieldItemProps {
  index: number;
  field: SchemaField;
  onChange: (field: SchemaField) => void;
  onDelete: () => void;
}

const FieldItem: React.FC<FieldItemProps> = ({field, onChange, onDelete }) => {
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...field, key: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    const updatedField = {
      ...field,
      type: value as "string" | "number" | "nested",
      children: value === "nested" ? field.children ?? [] : undefined,
    };
    onChange(updatedField);
  };

  const handleChildChange = (childIndex: number, updatedChild: SchemaField) => {
    if (!field.children) return;
    const updatedChildren = [...field.children];
    updatedChildren[childIndex] = updatedChild;
    onChange({ ...field, children: updatedChildren });
  };

  const handleAddChild = () => {
    const newChild: SchemaField = { key: "", type: "string" };
    const updatedChildren = field.children ? [...field.children, newChild] : [newChild];
    onChange({ ...field, children: updatedChildren });
  };

  const handleDeleteChild = (childIndex: number) => {
    if (!field.children) return;
    const updatedChildren = field.children.filter((_, i) => i !== childIndex);
    onChange({ ...field, children: updatedChildren });
  };

  return (
    <div className="ml-4 mt-2 border-l border-gray-300 pl-4">
      <div className="flex gap-2 items-center mb-2">
        <Input
          placeholder="Field Name"
          value={field.key}
          onChange={handleKeyChange}
          className="w-[160px]"
        />
        <Select value={field.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Field Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">string</SelectItem>
            <SelectItem value="number">number</SelectItem>
            <SelectItem value="nested">nested</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          ❌
        </Button>
      </div>

      {field.type === "nested" && (
        <div className="pl-4 border-l border-gray-300">
          {field.children?.map((child, idx) => (
            <FieldItem
              key={idx}
              index={idx}
              field={child}
              onChange={(updatedChild) => handleChildChange(idx, updatedChild)}
              onDelete={() => handleDeleteChild(idx)}
            />
          ))}
          <Button
            onClick={handleAddChild}
            variant="default"
            size="sm"
            className="mt-2 bg-blue-600 hover:bg-blue-700"
          >
            + Add Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldItem;
