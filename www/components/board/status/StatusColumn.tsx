import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import StatusCard from "../card/StatusCard";
import StatusColumnWrapper from "./StatusColumnWrapper";
import StatusHeader from "./StatusHeader";

const StatusColumn = ({ status }: { status: App.Models.Status }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: status.id,
    data: {
      type: "status",
      status,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-full w-72 flex-shrink-0 flex-col space-y-4"
      >
        <div className="h-9 rounded-lg bg-accent"></div>
        <div className="h-full rounded-lg bg-accent"></div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-full w-72 flex-col space-y-4"
    >
      <button {...attributes} {...listeners}>
        <StatusHeader status={status} />
      </button>
      <StatusColumnWrapper status={status}>
        {status?.cards?.map((card) => <StatusCard key={card.id} card={card} />)}
      </StatusColumnWrapper>
    </div>
  );
};
export default StatusColumn;
