import { ChangeEvent, useCallback } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputWithLabelProps {
  label: string;
  value: string;
  id: string;
  type: string;
  onChange: (value: string) => void;
}

const InputWithLabel = ({
  label,
  value,
  id,
  type,
  onChange,
}: InputWithLabelProps) => {
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
};

export default InputWithLabel;
