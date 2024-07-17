import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface CreateTableRequests {
  row: number;
  column: number;
}

const createTable = async (data: CreateTableRequests) => {
  await axios.post("/api/table", data);
};

export const usePostTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTableRequests) => createTable(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["useGetTable"] }),
  });
};
