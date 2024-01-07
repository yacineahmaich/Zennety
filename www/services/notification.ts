import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getNotifications = async (): Promise<App.Models.Notification[]> => {
  const response = await api.get("/notifications");

  return response.data.data;
};

const markNotificationAsRead = async ({ id }: { id: number }) => {
  await api.post(`/notifications/${id}/mark-as-read`);
};

const deleteNotification = async ({ id }: { id: number }) => {
  await api.delete(`/notifications/${id}`);
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

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: markNotificationAsRead,
    onMutate({ id }) {
      queryClient.setQueryData<App.Models.Notification[]>(
        ["notifications"],
        (notifications) =>
          notifications?.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return {
    markNotificationAsRead: mutate,
    isLoading: isPending,
  };
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNotification,
    onMutate({ id }) {
      queryClient.setQueryData<App.Models.Notification[]>(
        ["notifications"],
        (notifications) => notifications?.filter((n) => n.id !== id)
      );
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return {
    deleteNotification: mutate,
    isLoading: isPending,
  };
};
