import { useState, useCallback, ChangeEvent } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableCell } from "./ui/table";

interface EditableCellProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  onChange: (row: number, col: number, value: string) => void;
}

const EditableCell = ({
  rowIndex,
  colIndex,
  value,
  onChange,
}: EditableCellProps) => {
  const [isEdit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const onClickEdit = useCallback(() => setEdit(true), [setEdit]);
  const onClickSave = useCallback(() => {
    onChange(rowIndex, colIndex, newValue);
    setEdit(false);
  }, [rowIndex, colIndex, newValue, onChange, setEdit]);
  const onClickCancel = useCallback(() => {
    setEdit(false);
    setNewValue(value);
  }, [value, setEdit, setNewValue]);
  const onChangeNewValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNewValue(e.target.value),
    [setNewValue]
  );

  return (
    <TableCell className="tw-border-2 tw-border-black">
      <div className="tw-flex tw-gap-3">
        <Input
          value={newValue}
          readOnly={!isEdit}
          onChange={onChangeNewValue}
        />
        {isEdit ? (
          <>
            <Button onClick={onClickSave}>Save</Button>
            <Button onClick={onClickCancel}>Cancel</Button>
          </>
        ) : (
          <Button onClick={onClickEdit}>Edit</Button>
        )}
      </div>
    </TableCell>
  );
};

export default EditableCell;
