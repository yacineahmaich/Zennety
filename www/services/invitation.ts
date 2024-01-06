import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getInvitation = async (token: string): Promise<App.Models.Invitation> => {
  const response = await api.get(`/invitations/${token}`);

  return response.data.data;
};

const acceptInvitation = async ({ token }: { token: string }) => {
  const response = await api.post(`/invitations/${token}/accept`);

  return response.data.data;
};

const rejectInvitation = async ({ token }: { token: string }) => {
  const response = await api.post(`/invitations/${token}/reject`);

  return response.data.data;
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useInvitation = (token: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["invitations", token],
    queryFn: () => getInvitation(token),
  });

  return {
    invitation: data,
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

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: acceptInvitation,
    onSuccess() {
      queryClient.removeQueries({
        queryKey: ["invitations"],
      });
    },
  });

  return {
    acceptInvitation: mutate,
    isLoading: isPending,
  };
};

export const useRejectInvitation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: rejectInvitation,
    onSuccess() {
      queryClient.removeQueries({
        queryKey: ["invitations"],
      });
    },
  });

  return {
    rejectInvitation: mutate,
    isLoading: isPending,
  };
};
