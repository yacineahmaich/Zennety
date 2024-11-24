import StatusCard from "@/components/card/status-card";
import CreateStatus from "@/components/status/create-status";
import StatusColumn from "@/components/status/status-column";
import { useReorderStatuses, useStatuses } from "@/services";
import { useReorderCards } from "@/services/card";
import { IBoard, ICard, IStatus } from "@/types/models";
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

type Props = { board: IBoard };

const Kanban = ({ board }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<IStatus | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { statuses } = useStatuses(workspaceId, boardId);
  const { reorderStatuses, optimistacallyReorderStatuses } =
    useReorderStatuses();

  const { reorderCards, optimistacallyReorderCards } = useReorderCards();

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

    if (!over || active.id === over.id) return;

    if (
      active.data.current?.type === "status" &&
      over.data.current?.type === "status"
    ) {
      const activeStatus = active.data.current?.status as IStatus;
      const overStatus = over.data.current?.status as IStatus;

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
      const activeCard = active.data.current?.card as ICard;
      const overCard = over.data.current?.card as ICard;

      if (activeCard.id === overCard.id) return;

      queryClient.setQueryData<IStatus[]>(
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

    const activeCard = active.data.current?.card as ICard;

    if (
      over?.data.current?.type === "card" &&
      active?.data?.current?.card?.statusId !==
        over.data.current?.card?.statusId
    ) {
      // Swapp the two status cards
      const overCard = over.data.current?.card as ICard;

      if (activeCard.id === overCard.id) return;

      const reorderedStatuses = queryClient.setQueryData<IStatus[]>(
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

      const cardsOrder = reorderedStatuses
        ?.find((status) => status.id === overCard.statusId)
        ?.cards?.reduce((acc, card, idx) => ({ ...acc, [card.id]: idx }), {});

      console.log(cardsOrder);

      reorderCards({
        workspaceId,
        boardId,
        statusId: overCard.statusId.toString(),
        cardId: activeCard.id.toString(),
        cardsOrder: cardsOrder || {},
      });
    } else if (over?.data.current?.type === "status") {
      const overStatus = over?.data.current?.status as IStatus;

      if (activeCard.statusId === overStatus.id) return;

      const cardsOrder = optimistacallyReorderCards({
        workspaceId,
        boardId,
        activeCard,
        overStatusId: overStatus.id,
      });

      reorderCards({
        workspaceId,
        boardId,
        statusId: overStatus.id.toString(),
        cardId: activeCard.id.toString(),
        cardsOrder: cardsOrder || {},
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
    () => statuses.map((status) => `status-${status.id}`),
    [statuses]
  );

  const [collapsedColumns, setCollapsedColumns] = useState<Array<number>>([]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={pointerWithin}
    >
      <main className="-ml-4 flex-1 overflow-x-auto py-4 pl-4">
        <div className="flex h-full items-start gap-4">
          {statuses.length > 0 && (
            <>
              <SortableContext
                strategy={horizontalListSortingStrategy}
                items={items || []}
              >
                {statuses.map((status, idx) => (
                  <StatusColumn
                    key={status.id}
                    board={board}
                    status={status}
                    prevStatus={statuses[idx - 1]}
                    nextStatus={statuses[idx + 1]}
                    collapsed={collapsedColumns.includes(status.id)}
                    toggleCollapsed={() =>
                      setCollapsedColumns((cc) =>
                        cc.includes(status.id)
                          ? cc.filter((c) => c !== status.id)
                          : [...cc, status.id]
                      )
                    }
                  />
                ))}
                {createPortal(
                  <DragOverlay>
                    {activeStatus && (
                      <StatusColumn
                        board={board}
                        status={activeStatus}
                        collapsed={collapsedColumns.includes(activeStatus.id)}
                        toggleCollapsed={() => null}
                        dragging
                      />
                    )}
                    {/* @ts-ignore */}
                    {activeCard && <StatusCard card={activeCard} dragging />}
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
