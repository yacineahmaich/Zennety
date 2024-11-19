import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { api } from "@/lib/api";
import { route } from "@/lib/routes";
import { IBoard, IWorkspace } from "@/types/models";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const createWorkspace = async (
  workspace: CreateWorkspace
): Promise<IWorkspace> => {
  const response = await api.post("/workspaces", workspace);

  return response.data.data;
};

const getWorkspaceById = async (id: string): Promise<IWorkspace> => {
  const response = await api.get(`/workspaces/${id}`);

  return response.data.data;
};

const getMyWorkspaces = async (): Promise<IWorkspace[]> => {
  const response = await api.get(`/workspaces`);

  return response.data.data;
};

const updateWorkspace = async ({
  workspaceId,
  data,
}: {
  workspaceId: number;
  data: Record<string, unknown>;
}): Promise<IBoard> => {
  const response = await api.put(`/workspaces/${workspaceId}`, data);

  return response.data.data;
};

const deleteWorkspace = async ({ workspaceId }: { workspaceId: number }) => {
  await api.delete(`/workspaces/${workspaceId}`);
};

const setWorkspaceAvatar = async ({
  workspaceId,
  avatar,
}: {
  workspaceId: number;
  avatar: File;
}) => {
  await api.post(
    `/workspaces/${workspaceId}/avatar`,
    { avatar },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const deleteWorkspaceAvatar = async ({
  workspaceId,
}: {
  workspaceId: number;
}) => {
  await api.delete(`/workspaces/${workspaceId}/avatar`);
};

const transferWorkspaceOwnership = async ({
  workspaceId,
  newOwner,
}: {
  workspaceId: number;
  newOwner: string;
}): Promise<IBoard> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/transfer-ownership`,
    {
      newOwner,
    }
  );

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useWorkspace = (id: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["workspaces", id],
    queryFn: () => getWorkspaceById(id),
  });

  return {
    workspace: data,
  };
};

export const useMyWorkspaces = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-workspaces"],
    queryFn: () => getMyWorkspaces(),
  });

  return {
    workspaces: data,
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

export const useCreateWorkspace = () => {
  // const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkspace,
    onSuccess(workspace) {
      // Enable if navigating using next/router when a workspace created successfully
      // queryClient.setQueryData(["workspaces", workspace.id], workspace);
    },
  });

  return {
    createWorkspace: mutate,
    isLoading: isPending,
  };
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateWorkspace,
    onSuccess(workspace, { workspaceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId.toString()],
      });
    },
  });

  return {
    updateWorkspace: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useDeleteWorkspace = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess() {
      window.location.href = route("app");
    },
  });

  return {
    deleteWorkspace: mutate,
    isLoading: isPending,
  };
};

export const useTransferWorkspaceOwnership = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: transferWorkspaceOwnership,
    onSuccess(workspace, { workspaceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId.toString()],
      });
    },
  });

  return {
    transferWorkspaceOwnership: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useSetWorkspaceAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: setWorkspaceAvatar,
    onSuccess(workspace, { workspaceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId.toString()],
      });
    },
  });

  return {
    setWorkspaceAvatar: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useDeleteWorkspaceAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: deleteWorkspaceAvatar,
    onSuccess(workspace, { workspaceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId.toString()],
      });
    },
  });

  return {
    deleteWorkspaceAvatar: mutate,
    isLoading: isPending,
    variables,
  };
};
