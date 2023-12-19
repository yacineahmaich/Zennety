import { CreateBoard } from "@/components/board/CreateBoard";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const createBoard = async ({
  workspaceId,
  ...board
}: CreateBoard): Promise<App.Models.Board> => {
  const response = await api.post(`/workspaces/${workspaceId}/boards`, board);

  return response.data.data;
};

const getBoardById = async (id: string): Promise<App.Models.Board> => {
  const response = await api.get(`/boards/${id}`);

  return response.data.data;
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */

export const useCreateBoard = () => {
  // const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess(board) {
      // Enable if navigating using next/router when a workspace created successfully
      // queryClient.setQueryData(["workspaces", workspace.id], workspace);
    },
  });

  return {
    createBoard: mutate,
    isLoading: isPending,
  };
};

export const useBoard = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["boards", id],
    queryFn: () => getBoardById(id),
  });

  return {
    board: data,
    isLoading,
    isError,
    error,
  };
};
