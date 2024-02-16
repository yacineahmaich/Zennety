import { useStatuses } from "@/services";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import CreateStatus from "./status/CreateStatus";
import StatusColumn from "./status/StatusColumn";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [active, setActive] = useState<App.Models.Status | null>(null);
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { statuses } = useStatuses(workspaceId, boardId);

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

    queryClient.setQueryData<App.Models.Status[]>(
      [
        "workspaces",
        board.workspaceId.toString(),
        "boards",
        board.id.toString(),
        "statuses",
      ],
      (statuses = []) => {
        const activeStatusIndex = statuses?.findIndex(
          (s) => s.id == activeStatusId
        );
        const overStatusIndex = statuses?.findIndex(
          (s) => s.id == overStatusId
        );

        // Hack to avoid delayed ui update
        setActive(null);

        return arrayMove(statuses, activeStatusIndex, overStatusIndex);
      }
    );
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
              <CreateStatus board={board} />
            </>
          )}
        </div>
      </main>
    </DndContext>
  );
};

export default Kanban;
