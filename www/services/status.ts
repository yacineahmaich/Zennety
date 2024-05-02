import { CreateStatus } from "@/components/board/status/CreateStatus";
import { api } from "@/lib/api";
import { arrayMove } from "@dnd-kit/sortable";
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

const reorderStatuses = async ({
  workspaceId,
  boardId,
  statusesOrder,
}: {
  workspaceId: string;
  boardId: string;
  statusesOrder: Record<number, number>;
}): Promise<App.Models.Status> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/reorder`,
    {
      statuses_order: statusesOrder,
    }
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

export const useReorderStatuses = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: reorderStatuses,
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

  const optimistacallyReorderStatuses = ({
    workspaceId,
    boardId,
    activeStatusId,
    overStatusId,
  }: {
    workspaceId: string;
    boardId: string;
    activeStatusId: number;
    overStatusId: number;
  }) => {
    const reorderedStatuses = queryClient.setQueryData<App.Models.Status[]>(
      ["workspaces", workspaceId, "boards", boardId, "statuses"],
      (statuses = []) => {
        const activeStatusIndex = statuses?.findIndex(
          (s) => s.id == activeStatusId
        );
        const overStatusIndex = statuses?.findIndex(
          (s) => s.id == overStatusId
        );

        return arrayMove(statuses, activeStatusIndex, overStatusIndex);
      }
    );

    const statusesOrder = reorderedStatuses?.reduce(
      (acc, status, idx) => ({ ...acc, [status.id]: idx }),
      {}
    );

    return statusesOrder;
  };

  return {
    reorderStatuses: mutate,
    optimistacallyReorderStatuses,
    isLoading: isPending,
  };
};
