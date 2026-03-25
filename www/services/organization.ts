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
