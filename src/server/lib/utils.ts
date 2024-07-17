import { ROTATE_DIRECTION } from "./constants.js";

export const rotate = (
  table: string[][],
  row: number,
  column: number,
  direction: string
) => {
  const newTable = new Array(column);
  for (let i = 0; i < column; i++) {
    newTable[i] = new Array(row);
    for (let j = 0; j < row; j++) {
      newTable[i][j] =
        direction === ROTATE_DIRECTION.CLOCKWISE
          ? table[j][column - i - 1]
          : table[row - j - 1][i];
    }
  }
  return newTable;
};
