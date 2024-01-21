import { CreateWorkspace } from "@/components/workspace/CreateWorkspace";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const createWorkspace = async (
  workspace: CreateWorkspace
): Promise<App.Models.Workspace> => {
  const response = await api.post("/workspaces", workspace);

  return response.data.data;
};

const getWorkspaceById = async (id: string): Promise<App.Models.Workspace> => {
  const response = await api.get(`/workspaces/${id}`);

  return response.data.data;
};

const getMyWorkspaces = async (): Promise<App.Models.Workspace[]> => {
  const response = await api.get(`/workspaces`);

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useWorkspace = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workspaces", id],
    queryFn: () => getWorkspaceById(id),
  });

  return {
    workspace: data,
    isLoading,
    isError,
    error,
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
