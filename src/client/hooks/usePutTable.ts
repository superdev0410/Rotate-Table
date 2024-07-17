import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateTableRequest {
  row: number;
  column: number;
  value: string;
}

const updateTable = async (data: UpdateTableRequest) => {
  await axios.put("/api/table", data);
};

export const usePutTable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTableRequest) => updateTable(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["useGetTable"] }),
  });
};
