import { CreateBoard } from "@/components/board/CreateBoard";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createBoard = async ({
  workspaceId,
  ...board
}: CreateBoard): Promise<App.Models.Board> => {
  const response = await api.post(`/workspaces/${workspaceId}/boards`, board);

  return response.data.data;
};

const getBoardById = async (
  workspaceId: string,
  boardId: string
): Promise<App.Models.Board> => {
  const response = await api.get(
    `/workspaces/${workspaceId}/boards/${boardId}`
  );

  return response.data.data;
};

const updateBoard = async ({
  workspaceId,
  boardId,
  data,
}: {
  workspaceId: number;
  boardId: number;
  data: Record<string, unknown>;
}): Promise<App.Models.Board> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}`,
    data
  );

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

export const useBoard = (workspaceId: string, boardId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workspaces", workspaceId, "boards", boardId],
    queryFn: () => getBoardById(workspaceId, boardId),
    enabled: !!workspaceId && !!boardId,
  });

  return {
    board: data,
    isLoading,
    isError,
    error,
  };
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateBoard,
    onSuccess(board, { workspaceId, boardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
        ],
      });
    },
  });

  return {
    updateBoard: mutate,
    isLoading: isPending,
    variables,
  };
};
