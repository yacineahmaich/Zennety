import { InviteMembers } from "@/components/shared/InviteMembers";
import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { IInvitation } from "@/types/models";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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
): Promise<Paginator<IInvitation>> => {
  const response = await api.get(`/invitations/${resourceType}/${resourceId}`, {
    params,
  });

  return response.data;
};

const getInvitation = async (token: string): Promise<IInvitation> => {
  const response = await api.get(`/invitations/${token}`);

  return response.data.data;
};

const acceptInvitation = async ({ token }: { token: string }) => {
  await api.post(`/invitations/${token}/accept`);
};

const rejectInvitation = async ({ token }: { token: string }) => {
  await api.post(`/invitations/${token}/reject`);
};

const deleteInvitation = async ({ token }: { token: string }) => {
  await api.delete(`/invitations/${token}`);
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */

export const useInvitation = (token: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["invitations", token],
    queryFn: () => getInvitation(token),
  });

  return {
    invitation: data,
  };
};

export const useInvitations = (
  resourceType: ResourceType,
  resourceId: number,
  params: Record<string, string>
) => {
  const { data } = useSuspenseQuery({
    queryKey: ["invitations", resourceType, resourceId, params],
    queryFn: () => getInvitations(resourceType, resourceId, params),
  });

  return {
    invitations: data?.data,
    pagination: data?.meta,
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
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
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
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  return {
    rejectInvitation: mutate,
    isLoading: isPending,
  };
};

export const useSendMembershipInvitations = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: sendMembershipInvitations,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });
    },
  });

  return {
    sendMembershipInvitations: mutate,
    isLoading: isPending,
  };
};

export const useDeleteInvitation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteInvitation,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });
    },
  });

  return {
    deleteInvitation: mutate,
    isLoading: isPending,
  };
};
