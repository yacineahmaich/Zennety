import { priorties } from "@/lib/constants";
import { Priority } from "@/types/enums";
import { FlagTriangleRightIcon } from "lucide-react";

type Props = {
  priority: Priority;
  size?: number;
};

const PriorityIcon = ({ priority, size = 14 }: Props) => {
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
