import { ChangeEvent, useCallback, memo } from "react";

import { Input, Label } from "./ui";

interface InputWithLabelProps {
  label: string;
  value: string;
  id: string;
  type: string;
  onChange: (value: string) => void;
}

export const InputWithLabel = memo(
  ({ label, value, id, type, onChange }: InputWithLabelProps) => {
    const onValueChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
      [onChange]
    );

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <Input type={type} id={id} value={value} onChange={onValueChange} />
      </div>
    );
  }
);
