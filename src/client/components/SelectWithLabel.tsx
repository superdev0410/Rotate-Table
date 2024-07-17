import { memo } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from "./ui";

interface SelectWithLabelProps {
  label: string;
  value: string;
  placeholder?: string;
  items: string[];
  onChange: (value: string) => void;
}

export const SelectWithLabel = memo(
  ({ label, value, items, placeholder, onChange }: SelectWithLabelProps) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);
