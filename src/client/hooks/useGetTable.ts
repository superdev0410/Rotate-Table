import { useQuery } from "react-query";
import axios from "axios";

interface TableInfo {
  row: number;
  column: number;
  direction: string;
  table: string[][];
}

const fetchTable = async (): Promise<TableInfo> => {
  const res = await axios.get("/api/table");
  return res.data;
};

export const useGetTable = () => {
  const query = useQuery({
    queryKey: ["useGetTable"],
    enabled: true,
    queryFn: fetchTable,
  });

  return query;
};
