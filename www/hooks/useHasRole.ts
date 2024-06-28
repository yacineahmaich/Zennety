import { useUser } from "@/services";
import { Role } from "@/types/enums";
import { ResourceType } from "@/types/helpers";

export const useHasRole = (
  role: Role,
  resourceType: ResourceType,
  resourceId?: number
) => {
  const { user } = useUser();

  const membership = user?.memberships?.find(
    (m) => m.resourceId === resourceId && m.resourceType === resourceType
  );

  if (!membership) return false;

  const hasRole = membership?.role === role;

  return hasRole;
};
