import { useReorderStatuses, useStatuses } from "@/services";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import CreateStatus from "./status/CreateStatus";
import StatusColumn from "./status/StatusColumn";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  const router = useRouter();
  const [active, setActive] = useState<App.Models.Status | null>(null);
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { statuses } = useStatuses(workspaceId, boardId);
  const { reorderStatuses, optimistacallyReorderStatuses } =
    useReorderStatuses();

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "status") {
      setActive(e.active.data.current?.status);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over) return;

    const activeStatusId = e.active.id;
    const overStatusId = e.over.id;

    if (activeStatusId === overStatusId) return;

    const statusesOrder = optimistacallyReorderStatuses({
      workspaceId,
      boardId,
      activeStatusId: +activeStatusId,
      overStatusId: +overStatusId,
    });
    // this is neccessary to avoid delayed optimistic update :(
    setActive(null);

    if (!statusesOrder) return;

    reorderStatuses({
      workspaceId,
      boardId,
      statusesOrder,
    });
  };

  const items = useMemo(() => statuses?.map((status) => status.id), [statuses]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className="flex-1 overflow-x-auto p-3">
        <div className="flex h-full items-start gap-4">
          {(statuses || []).length > 0 && (
            <>
              <SortableContext items={items || []}>
                {statuses?.map((status) => (
                  <StatusColumn key={status.id} status={status} />
                ))}
                <DragOverlay>
                  {active && <StatusColumn status={active} />}
                </DragOverlay>
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
