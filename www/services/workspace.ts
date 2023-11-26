import { CreateWorkspace } from "@/components/workspace/CreateWorkspace";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const createWorkspace = async (
  workspace: CreateWorkspace
): Promise<App.Models.Workspace> => {
  const response = await api.post("/workspaces", workspace);

  return response.data.data;
};

const getWorkspaceById = async (id: number): Promise<App.Models.Workspace> => {
  const response = await api.get(`/workspaces/${id}`);

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useWorkspace = (id: number) => {
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

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createWorkspace,
  });

  return {
    createWorkspace: mutate,
    isLoading: isPending,
  };
};
