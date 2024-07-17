import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const rotateTable = async (direction: string) => {
  await axios.put("/api/table/rotate", { direction });
};

export const usePutTableRotate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (direction: string) => rotateTable(direction),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["useGetTable"] }),
  });
};
