import { usePin } from "@/services";
import { ResourceType } from "@/types/helpers";
import { StarIcon } from "lucide-react";

const PinButton = ({
  resourceType,
  resourceId,
  pinned,
}: {
  resourceId: number;
  resourceType: ResourceType;
  pinned: boolean;
}) => {
  const { pin } = usePin();
  return (
    <button
      onClick={() => pin({ resourceType, resourceId })}
      className="flex items-center justify-center transition-transform active:scale-90"
    >
      <StarIcon
        size={16}
        className={
          pinned ? "fill-yellow-300 stroke-yellow-300" : "fill-transparent"
        }
      />
    </button>
  );
};

export default PinButton;
