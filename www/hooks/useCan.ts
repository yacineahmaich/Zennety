import { useUser } from "@/services";
import { Namespace } from "@/types/enums";

type Action = "view" | "update" | "delete";

export const useCan = (
  action: Action,
  namespace: Namespace,
  resourceId?: number
) => {
  const { user } = useUser();

  const membership = user?.memberships?.find(
    (m) => m.resourceId === resourceId && m.namespace === namespace
  );

  if (!membership) return false;

  const can = membership?.permissions.includes(action);

  return can;
};
