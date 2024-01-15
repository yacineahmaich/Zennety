import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getMembers = async (
  id: number,
  params: Record<string, string>
): Promise<Paginator<App.Models.Member>> => {
  const response = await api.get(`/memberships/${id}/members`, {
    params,
  });

  return response.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useMembers = (id: number, params: Record<string, string>) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["memberships", id, params],
    queryFn: () => getMembers(id, params),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
