import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getNotifications = async (): Promise<App.Models.Notification[]> => {
  const response = await api.get("/notifications");

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useNotifications = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
    refetchInterval: 1000 * 30, // Poll every 30 seconds
  });

  return {
    notifications: data,
    isLoading,
    isError,
    error,
  };
};
