import { useUser } from "@/services";
import { ResourceType } from "@/types/helpers";

type Action = "view" | "update" | "delete";

export const useCan = (
  action: Action,
  resourceType: ResourceType,
  resourceId?: number
) => {
  const { user } = useUser();

  const membership = user?.memberships?.find(
    (m) => m.resourceId === resourceId && m.resourceType === resourceType
  );

  if (!membership) return false;

  const can = membership?.permissions.includes(action);

  return can;
};
