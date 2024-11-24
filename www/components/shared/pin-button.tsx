import { cn } from "@/lib/utils";
import { usePin } from "@/services";
import { ResourceType } from "@/types/helpers";
import { StarIcon } from "lucide-react";

type Props = {
  resourceId: number;
  resourceType: ResourceType;
  pinned: boolean;
};

const PinButton = ({ resourceType, resourceId, pinned }: Props) => {
  const { pin, isLoading } = usePin();

  return (
    <button
      onClick={() => pin({ resourceType, resourceId })}
      className="flex items-center justify-center transition-transform active:scale-90"
      disabled={isLoading}
    >
      <StarIcon
        size={16}
        className={cn(pinned && "fill-yellow-300 stroke-yellow-300")}
      />
    </button>
  );
};

export default PinButton;
