import { CreateStatus } from "@/components/Status/CreateStatus";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
