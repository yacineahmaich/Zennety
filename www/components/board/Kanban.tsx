import { useReorderStatuses, useStatuses } from "@/services";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import StatusCard from "../card/StatusCard";
import Loader from "../shared/Loader";
import CreateStatus from "../status/CreateStatus";
import StatusColumn from "../status/StatusColumn";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  const queryClient = useQueryClient();
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
    if (!over || active.id === over.id) return;

    // this is neccessary to avoid delayed optimistic update :(
    setActiveStatus(null);
    setActiveCard(null);

    if (
      active.data.current?.type === "status" &&
      over.data.current?.type === "status"
    ) {
      const activeStatus = active.data.current?.status as App.Models.Status;
      const overStatus = over.data.current?.status as App.Models.Status;

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
    } else if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "card"
    ) {
      const activeCard = active.data.current?.card as App.Models.Card;
      const overCard = over.data.current?.card as App.Models.Card;

      if (activeCard.id === overCard.id) return;

      queryClient.setQueryData<App.Models.Status[]>(
        ["workspaces", workspaceId, "boards", boardId, "statuses"],
        (statuses = []) => {
          return statuses.map((status) => {
            if (status.id !== activeCard.statusId) return status;

            const cards = status.cards || [];
            const activeCardIndex = cards.findIndex(
              (card) => card.id === activeCard.id
            );
            const overCardIndex = cards?.findIndex(
              (card) => card.id === overCard.id
            );

            const updatedCards = arrayMove(
              cards,
              activeCardIndex,
              overCardIndex
            );

            return {
              ...status,
              cards: updatedCards,
            };
          });
        }
      );
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.data?.current?.type !== "card") return;

    const activeCard = active.data.current?.card as App.Models.Card;

    if (over?.data.current?.type === "card") {
      // Swapp the two status cards
      const overCard = over.data.current?.card as App.Models.Card;

      if (activeCard.id === overCard.id) return;

      queryClient.setQueryData<App.Models.Status[]>(
        ["workspaces", workspaceId, "boards", boardId, "statuses"],
        (statuses = []) => {
          // find the index of the active card status
          const activeCardStatusIndex = statuses.findIndex(
            (status) => status.id === activeCard.statusId
          );

          // find the index of the over card status
          const overCardStatusIndex = statuses.findIndex(
            (status) => status.id === overCard.statusId
          );

          // find the over card index
          const overCardIndex = statuses[overCardStatusIndex].cards?.findIndex(
            (card) => card.id === overCard.id
          );

          if (overCardIndex === undefined || overCardIndex === -1)
            return statuses;

          // remove active card from old status
          statuses[activeCardStatusIndex].cards = statuses[
            activeCardStatusIndex
          ].cards?.filter((card) => card.id !== activeCard.id);

          // add card to over card status
          activeCard.statusId = overCard.statusId;
          statuses[overCardStatusIndex].cards?.push(activeCard);

          // move the card to the right position
          statuses[overCardStatusIndex].cards = arrayMove(
            statuses[overCardStatusIndex].cards ?? [],
            -1,
            overCardIndex
          );

          return statuses;
        }
      );
    } else if (over?.data.current?.type === "status") {
      const overStatus = over?.data.current?.status as App.Models.Status;

      if (activeCard.statusId === overStatus.id) return;

      queryClient.setQueryData<App.Models.Status[]>(
        ["workspaces", workspaceId, "boards", boardId, "statuses"],
        (statuses = []) => {
          // find the index of the active card status
          const activeCardStatusIndex = statuses.findIndex(
            (status) => status.id === activeCard.statusId
          );

          // find the index of the over status
          const overStatusIndex = statuses.findIndex(
            (status) => status.id === overStatus.id
          );

          // remove active card from old status
          statuses[activeCardStatusIndex].cards = statuses[
            activeCardStatusIndex
          ].cards?.filter((card) => card.id !== activeCard.id);

          // add card to over card status
          activeCard.statusId = overStatus.id;
          statuses[overStatusIndex].cards?.unshift(activeCard);

          return statuses;
        }
      );
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
      onDragOver={handleDragOver}
      collisionDetection={pointerWithin}
    >
      <main className="flex-1 overflow-x-auto p-3">
        <div className="flex h-full items-start gap-4">
          {(statuses || []).length > 0 && (
            <>
              <SortableContext
                strategy={horizontalListSortingStrategy}
                items={items || []}
              >
                {statuses?.map((status) => (
                  <StatusColumn key={status.id} board={board} status={status} />
                ))}
                {createPortal(
                  <DragOverlay>
                    {activeStatus && (
                      <StatusColumn board={board} status={activeStatus} />
                    )}
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
