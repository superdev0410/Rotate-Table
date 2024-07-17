import { useState, useCallback, useEffect } from "react";

import InputWithLabel from "./components/InputWithLabel";
import SelectWithLabel from "./components/SelectWithLabel";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import { useGetTable, usePostTable, usePutTableRotate } from "./hooks";
import { DIRECTIONS } from "./lib/constants";

const App = () => {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [direction, setDirection] = useState("");
  const tableInfo = useGetTable();
  const createTable = usePostTable();
  const rotateTable = usePutTableRotate();
  const { toast } = useToast();

  const onRowChange = useCallback(
    (value: string) => setRow(Number(value)),
    [setRow]
  );
  const onColumnChange = useCallback(
    (value: string) => setColumn(Number(value)),
    [setColumn]
  );
  const onClickCreate = useCallback(() => {
    if (row === 0 || column === 0) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Number of rows and columns should be larger tha 0",
      });
      return;
    }
    createTable.mutate(
      { row, column },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Create Table Successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to create table",
            variant: "destructive",
          });
        },
      }
    );
  }, [row, column]);
  const onClickRotate = useCallback(() => {
    if (!direction) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Choose direction before rotate table",
      });
      return;
    }
    rotateTable.mutate(direction, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Rotate Table Successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to rotate table",
          variant: "destructive",
        });
      },
    });
  }, [direction]);

  useEffect(() => {
    if (tableInfo.data && !tableInfo.isLoading) {
      setRow(tableInfo.data.row);
      setColumn(tableInfo.data.column);
      setDirection(tableInfo.data.direction);
    }
  }, [tableInfo.data, tableInfo.isLoading]);

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
        <Button onClick={onClickCreate}>Create</Button>
        <SelectWithLabel
          label="Direction"
          value={direction}
          items={DIRECTIONS}
          placeholder="Select Direction"
          onChange={setDirection}
        />
        <Button onClick={onClickRotate}>Rotate</Button>
      </div>

      {!tableInfo.isLoading && tableInfo.data && (
        <Table>
          <TableBody>
            {tableInfo.data.table.map((rowData, rowIndex) => (
              <TableRow key={rowIndex}>
                {rowData.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="tw-border-2 tw-border-black"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Toaster />
    </div>
  );
};

export default App;
