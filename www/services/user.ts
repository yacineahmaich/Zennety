import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
