import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import StatusCard from "../card/StatusCard";
import StatusColumnWrapper from "./StatusColumnWrapper";
import StatusHeader from "./StatusHeader";

const StatusColumn = ({
  board,
  status,
  prevStatus,
  nextStatus,
  collapsed,
  toggleCollapsed,
  dragging = false,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  nextStatus?: App.Models.Status;
  prevStatus?: App.Models.Status;
  collapsed: boolean;
  toggleCollapsed: () => void;
  dragging?: boolean;
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `status-${status.id}`,
    data: {
      type: "status",
      status,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const items = useMemo(
    () => status.cards?.map((card) => `card-${card.id}`),
    [status.cards]
  );

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex h-full flex-shrink-0 flex-col space-y-4",
          collapsed ? "w-16" : "w-72"
        )}
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
      className={cn(
        "flex h-full transform flex-col space-y-4 transition-[width]",
        collapsed ? "w-auto" : "w-72",
        dragging && "-rotate-2"
      )}
    >
      <div {...attributes} {...listeners}>
        <StatusHeader
          board={board}
          status={status}
          prevStatus={prevStatus}
          nextStatus={nextStatus}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
      </div>
      {collapsed ? (
        <Button
          variant="secondary"
          className="grid h-full w-16 place-items-center rounded-lg bg-secondary"
          onClick={toggleCollapsed}
        >
          <p
            className="rotate-180 text-sm uppercase"
            style={{ textOrientation: "mixed", writingMode: "vertical-lr" }}
          >
            {status.name} [{status.cards?.length}]
          </p>
        </Button>
      ) : (
        <StatusColumnWrapper board={board} status={status}>
          <SortableContext
            items={items || []}
            strategy={verticalListSortingStrategy}
            disabled={collapsed}
          >
            {status?.cards?.map((card) => (
              <StatusCard
                key={card.id}
                card={card}
                status={status}
                board={board}
              />
            ))}
          </SortableContext>
        </StatusColumnWrapper>
      )}
    </div>
  );
};
export default StatusColumn;
