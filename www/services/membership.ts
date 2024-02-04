import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getMembers = async (
  resourceType: ResourceType,
  resourceId: number,
  params: Record<string, string>
): Promise<Paginator<App.Models.Member>> => {
  const response = await api.get(
    `/memberships/${resourceType}/${resourceId}/members`,
    {
      params,
    }
  );

  return response.data;
};

const updateMemberRole = async ({
  id,
  resourceId,
  resourceType,
  role,
}: {
  id: number;
  resourceType: ResourceType;
  resourceId: number;
  role: string;
}) => {
  await api.put(`/memberships/${resourceType}/${resourceId}/members/${id}`, {
    role,
  });
};

const deleteMember = async ({
  id,
  resourceId,
  resourceType,
}: {
  id: number;
  resourceType: ResourceType;
  resourceId: number;
}) => {
  await api.delete(`/memberships/${resourceType}/${resourceId}/members/${id}`);
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useMembers = (
  resourceType: ResourceType,
  resourceId: number,
  params: Record<string, string>
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["memberships", resourceType, resourceId, params],
    queryFn: () => getMembers(resourceType, resourceId, params),
    enabled: !!resourceType && !!resourceId,
  });

  return {
    data,
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

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: deleteMember,
    onSuccess(data, { resourceType, resourceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["memberships", resourceType, resourceId],
      });
    },
  });

  return {
    deleteMember: mutateAsync,
    isLoading,
  };
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: updateMemberRole,
    onSuccess(data, { resourceType, resourceId }) {
      return queryClient.invalidateQueries({
        queryKey: ["memberships", resourceType, resourceId],
      });
    },
  });

  return {
    updateMemberRole: mutateAsync,
    isLoading,
  };
};
