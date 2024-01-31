import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { useQuery } from "@tanstack/react-query";

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
