import { useState, useCallback } from "react";

import InputWithLabel from "./components/InputWithLabel";
import SelectWithLabel from "./components/SelectWithLabel";
import { DIRECTIONS } from "./lib/constants";

const App = () => {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [direction, setDirection] = useState("");

  const onRowChange = useCallback(
    (value: string) => setRow(Number(value)),
    [setRow]
  );
  const onColumnChange = useCallback(
    (value: string) => setColumn(Number(value)),
    [setColumn]
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-5 tw-p-5 tw-items-center">
      <div className="tw-flex tw-flex-col tw-gap-4 tw-w-96">
        <InputWithLabel
          label="Row"
          type="number"
          id="row"
          value={row.toString()}
          onChange={onRowChange}
        />
        <InputWithLabel
          label="Columns"
          type="number"
          id="columns"
          value={column.toString()}
          onChange={onColumnChange}
        />
        <SelectWithLabel
          label="Direction"
          value={direction}
          items={DIRECTIONS}
          placeholder="Select Direction"
          onChange={setDirection}
        />
      </div>
    </div>
  );
};

export default App;
