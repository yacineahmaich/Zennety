import { InviteMembers } from "@/components/shared/InviteMembers";
import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const sendMembershipInvitations = async ({
  resourceType,
  resourceId,
  data,
}: {
  resourceType: ResourceType;
  resourceId: number;
  data: InviteMembers;
}) => {
  await api.post(`/invitations/${resourceType}/${resourceId}/invite`, data);
};

const getInvitations = async (
  resourceType: ResourceType,
  resourceId: number,
  params: Record<string, string>
): Promise<Paginator<App.Models.Invitation>> => {
  const response = await api.get(`/invitations/${resourceType}/${resourceId}`, {
    params,
  });

  return response.data;
};

const getInvitation = async (token: string): Promise<App.Models.Invitation> => {
  const response = await api.get(`/invitations/${token}`);

  return response.data.data;
};

const acceptInvitation = async ({ token }: { token: string }) => {
  await api.post(`/invitations/${token}/accept`);
};

const rejectInvitation = async ({ token }: { token: string }) => {
  await api.post(`/invitations/${token}/reject`);
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

export const useInvitations = (
  resourceType: ResourceType,
  resourceId: number,
  params: Record<string, string>
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["invitations", resourceType, resourceId, params],
    queryFn: () => getInvitations(resourceType, resourceId, params),
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

export const useSendMembershipInvitations = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendMembershipInvitations,
  });

  return {
    sendMembershipInvitations: mutate,
    isLoading: isPending,
  };
};
