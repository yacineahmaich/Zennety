import { useReorderStatuses, useStatuses } from "@/services";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Loader from "../shared/Loader";
import StatusCard from "./card/StatusCard";
import CreateStatus from "./status/CreateStatus";
import StatusColumn from "./status/StatusColumn";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<App.Models.Status | null>(
    null
  );
  const [activeCard, setActiveCard] = useState<App.Models.Card | null>(null);
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { statuses, isLoading } = useStatuses(workspaceId, boardId);
  const { reorderStatuses, optimistacallyReorderStatuses } =
    useReorderStatuses();

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "status") {
      setActiveStatus(e.active.data.current?.status);
    }
    if (e.active.data.current?.type === "card") {
      setActiveCard(e.active.data.current?.card);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    // this is neccessary to avoid delayed optimistic update :(
    setActiveStatus(null);
    setActiveCard(null);

    if (!over) return;

    if (active.data.current?.type === "status") {
      const activeStatus = active.data.current?.status as App.Models.Status;
      const overStatus = over.data.current?.status as App.Models.Status;

      if (active.id === over.id) return;

      const statusesOrder = optimistacallyReorderStatuses({
        workspaceId,
        boardId,
        activeStatusId: activeStatus.id,
        overStatusId: overStatus.id,
      });

      if (!statusesOrder) return;

      reorderStatuses({
        workspaceId,
        boardId,
        statusesOrder,
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const items = useMemo(
    () => statuses?.map((status) => `status-${status.id}`),
    [statuses]
  );

  if (isLoading) return <Loader />;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main className="flex-1 overflow-x-auto p-3">
        <div className="flex h-full items-start gap-4">
          {(statuses || []).length > 0 && (
            <>
              <SortableContext items={items || []}>
                {statuses?.map((status) => (
                  <StatusColumn key={status.id} status={status} />
                ))}
                {createPortal(
                  <DragOverlay>
                    {activeStatus && <StatusColumn status={activeStatus} />}
                    {activeCard && <StatusCard card={activeCard} />}
                  </DragOverlay>,
                  document.body
                )}
              </SortableContext>
            </>
          )}
          <CreateStatus board={board} />
        </div>
      </main>
    </DndContext>
  );
};

export default Kanban;
