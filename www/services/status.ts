import { CreateStatus } from "@/components/board/status/CreateStatus";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getStatuses = async (
  workspaceId: string,
  boardId: string
): Promise<App.Models.Status[]> => {
  const response = await api.get(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses`
  );

  return response.data.data;
};

const createStatus = async ({
  workspaceId,
  boardId,
  ...status
}: CreateStatus): Promise<App.Models.Status> => {
  const response = await api.post(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses`,
    status
  );

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useStatuses = (workspaceId: string, boardId: string) => {
  const {
    data: statuses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workspaces", workspaceId, "boards", boardId, "statuses"],
    queryFn: () => getStatuses(workspaceId, boardId),
  });

  return {
    statuses,
    isLoading,
    isError,
    error,
  };
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */

export const useCreateStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createStatus,
    onSuccess(status, { workspaceId, boardId }) {
      queryClient.invalidateQueries({
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
    createStatus: mutate,
    isLoading: isPending,
  };
};
