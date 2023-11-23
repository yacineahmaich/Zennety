import { CreateWorkspace } from "@/components/workspace/CreateWorkspace";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const createWorkspace = async (
  workspace: CreateWorkspace
): Promise<App.Models.Workspace> => {
  const response = await api.post("/workspaces", workspace);

  return response.data.data;
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
