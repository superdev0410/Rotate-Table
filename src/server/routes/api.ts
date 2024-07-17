import { Router, Request, Response } from "express";

import { rotate } from "../lib/utils.js";

const apiRouter = Router();

var rows = 0;
var columns = 0;
var direction = "";
var table: string[][] = [];

apiRouter.get("/table", async (_: Request, res: Response) => {
  res.json({
    rows: rows,
    columns: columns,
    direction: direction,
    table: table,
  });
});

apiRouter.post("/table", async (req: Request, res: Response) => {
  const { row, column } = req.body;
  rows = row;
  columns = column;
  table = new Array(row);
  for (let i = 0; i < row; i++) {
    table[i] = new Array(column).fill(i);
  }
  res.sendStatus(200);
});

apiRouter.put("/table", async (req: Request, res: Response) => {
  const { row, column, value } = req.body;
  table[row][column] = value;
  res.sendStatus(200);
});

apiRouter.put(
  "/table/rotate/:direction",
  async (req: Request, res: Response) => {
    direction = req.params.direction;
    table = rotate(table, rows, columns, direction);
    res.sendStatus(200);
  }
);

export default apiRouter;
