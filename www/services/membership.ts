import { api } from "@/lib/api";
import { MembershipableType } from "@/types/helpers";
import { useQuery } from "@tanstack/react-query";

const getMembers = async (
  type: MembershipableType,
  id: number,
  params: Record<string, string>
): Promise<Paginator<App.Models.Member>> => {
  const response = await api.get(`/memberships/${type}/${id}/members`, {
    params,
  });

  return response.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useMembers = (
  type: MembershipableType,
  id: number,
  params: Record<string, string>
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["memberships", type, id, params],
    queryFn: () => getMembers(type, id, params),
    enabled: !!type && !!id,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
