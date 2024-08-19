import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProfile = async (data: Record<string, unknown>) => {
  const response = await api.put(`/user`, data);

  return response.data.data;
};

const pin = async ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  await api.put(`/pins/${resourceType}/${resourceId}`);
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    updateProfile: mutate,
    isLoading: isPending,
  };
};

export const usePin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: pin,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["my-workspaces"],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  return {
    pin: mutate,
    isLoading: isPending,
  };
};
