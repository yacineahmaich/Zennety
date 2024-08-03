import { CreateStatus } from "@/components/status/CreateStatus";
import { api } from "@/lib/api";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getStatuses = async (
  workspaceId: string,
  boardId: string,
  signal: AbortSignal
): Promise<App.Models.Status[]> => {
  const response = await api.get(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses`,
    {
      signal,
    }
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
const updateStatus = async ({
  workspaceId,
  boardId,
  statusId,
  data,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  data: Record<string, unknown>;
}): Promise<App.Models.Status> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}`,
    data
  );

  return response.data.data;
};

const deleteStatus = async ({
  workspaceId,
  boardId,
  statusId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
}) => {
  await api.delete(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}`
  );
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
    queryFn: ({ signal }) => getStatuses(workspaceId, boardId, signal),
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
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    createStatus: mutate,
    isLoading: isPending,
  };
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateStatus,
    onSuccess(status, { workspaceId, boardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    updateStatus: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useDeleteStatus = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteStatus,
    onSuccess(_, { workspaceId, boardId }) {
      queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    deleteStatus: mutateAsync,
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
