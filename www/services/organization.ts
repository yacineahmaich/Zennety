import {
  ACTIVE_ORG_STORAGE_KEY,
  readStoredActiveOrganizationId,
} from "@/lib/active-organization";
import { api } from "@/lib/api";
import { IOrganization } from "@/types/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export type CreateOrganizationPayload = {
  name: string;
  description?: string;
};

const getMyOrganizations = async (): Promise<IOrganization[]> => {
  const response = await api.get("/organizations");
  return response.data.data;
};

const getOrganization = async (id: number): Promise<IOrganization> => {
  const response = await api.get(`/organizations/${id}`);
  return response.data.data;
};

const createOrganization = async (
  payload: CreateOrganizationPayload
): Promise<IOrganization> => {
  const response = await api.post("/organizations", payload);
  return response.data.data;
};

const updateOrganization = async ({
  organizationId,
  data,
}: {
  organizationId: number;
  data: Record<string, unknown>;
}): Promise<IOrganization> => {
  const response = await api.put(`/organizations/${organizationId}`, data);
  return response.data.data;
};

const deleteOrganization = async ({
  organizationId,
}: {
  organizationId: number;
}) => {
  await api.delete(`/organizations/${organizationId}`);
};

const updateOrganizationAvatar = async ({
  organizationId,
  avatar,
}: {
  organizationId: number;
  avatar: File | "unset";
}) => {
  await api.post(
    `/organizations/${organizationId}/avatar`,
    { avatar },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const transferOrganizationOwnership = async ({
  organizationId,
  memberId,
}: {
  organizationId: number;
  memberId: string;
}) => {
  await api.put(
    `/organizations/${organizationId}/transfer-ownership/${memberId}`
  );
};

export const useMyOrganizations = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["organizations", "my"],
    queryFn: () => getMyOrganizations(),
  });

  return {
    organizations: data,
    isLoading,
    isError,
    error,
  };
};

/**
 * Resolved active org id (from localStorage, validated against your orgs) and
 * the current organization from GET /organizations/:id (shared via React Query).
 */
export function useOrganization() {
  const { organizations, isLoading: isLoadingOrganizations } =
    useMyOrganizations();

  const activeOrganizationId = useMemo(() => {
    if (!organizations?.length) {
      return null;
    }
    const stored = readStoredActiveOrganizationId();
    const valid = stored != null && organizations.some((o) => o.id === stored);
    return valid ? stored : organizations[0].id;
  }, [organizations]);

  useEffect(() => {
    if (!organizations?.length) {
      return;
    }
    const stored = readStoredActiveOrganizationId();
    const valid = stored != null && organizations.some((o) => o.id === stored);
    if (!valid) {
      window.localStorage.setItem(
        ACTIVE_ORG_STORAGE_KEY,
        String(organizations[0].id)
      );
    }
  }, [organizations]);

  const { data: organization, isLoading: isLoadingOrganization } = useQuery({
    queryKey: ["organization", activeOrganizationId],
    queryFn: () => getOrganization(activeOrganizationId!),
    enabled: activeOrganizationId != null,
  });

  const isOrganizationShellReady = !isLoadingOrganizations;

  return {
    organization,
    activeOrganizationId,
    organizations,
    isLoading: isLoadingOrganizations,
    isOrganizationLoading: isLoadingOrganization,
    isOrganizationShellReady,
  };
}

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrganization,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    createOrganization: mutate,
    isLoading: isPending,
  };
};

/**
 * Single organization by id (e.g. settings page). Includes members when returned by API.
 */
export function useOrganizationById(organizationId: number | null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => getOrganization(organizationId!),
    enabled: organizationId != null,
  });

  return {
    organization: data,
    isLoading,
    isError,
    error,
  };
}

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrganization,
    onSuccess(_data, { organizationId }) {
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return {
    updateOrganization: mutate,
    isLoading: isPending,
  };
};

export const useUpdateOrganizationAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrganizationAvatar,
    onSuccess(_data, { organizationId }) {
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return {
    updateOrganizationAvatar: mutate,
    isLoading: isPending,
  };
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrganization,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["organization"] });
    },
  });

  return {
    deleteOrganization: mutate,
    isLoading: isPending,
  };
};

export const useTransferOrganizationOwnership = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: transferOrganizationOwnership,
    onSuccess(_data, { organizationId }) {
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({
        queryKey: ["memberships", "organization", organizationId],
      });
    },
  });

  return {
    transferOrganizationOwnership: mutate,
    isLoading: isPending,
  };
};
