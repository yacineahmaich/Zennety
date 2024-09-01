import { priorties } from "@/lib/constants";
import { Priority } from "@/types/enums";
import { FlagTriangleRightIcon } from "lucide-react";

const PriorityIcon = ({
  priority,
  size = 14,
}: {
  priority: Priority;
  size?: number;
}) => {
  const priorityObj = priorties.find((p) => p.label === priority);

  if (!priorityObj) return null;

  return (
    <FlagTriangleRightIcon
      size={size}
      color={priorityObj.color}
      fill={priorityObj.color}
    />
  );
};

export default PriorityIcon;
