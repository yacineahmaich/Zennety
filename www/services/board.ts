import { CreateBoard } from "@/components/board/CreateBoard";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const createBoard = async ({
  workspaceId,
  ...board
}: CreateBoard): Promise<App.Models.Board> => {
  const response = await api.post(`/workspaces/${workspaceId}/boards`, board);

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
