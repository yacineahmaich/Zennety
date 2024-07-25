import { CreateCard } from "@/components/card/CreateCard";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCard = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
}): Promise<App.Models.Card> => {
  const response = await api.get(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}`
  );

  return response.data.data;
};

const createCard = async ({
  workspaceId,
  boardId,
  statusId,
  ...card
}: CreateCard): Promise<App.Models.Card> => {
  const response = await api.post(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards`,
    card
  );

  return response.data.data;
};

const updateCard = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
  data,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
  data: Record<string, unknown>;
}): Promise<App.Models.Card> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}`,
    data
  );

  return response.data.data;
};

const createCardComment = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
  comment,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
  comment: string;
}): Promise<App.Models.Card> => {
  const response = await api.post(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}/comments`,
    {
      comment,
    }
  );

  return response.data.data;
};

const getCardComments = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
}): Promise<App.Models.Activity<{ type: string; comment: string }>[]> => {
  const response = await api.get(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}/comments`
  );

  console.log(response.data);

  return response.data;
};

const reorderCards = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
  cardsOrder,
}: {
  workspaceId: string;
  boardId: string;
  statusId: string;
  cardId: string;
  cardsOrder: Record<number, number>;
}): Promise<App.Models.Status> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/cards/reorder`,
    {
      card_id: cardId,
      status_id: statusId,
      cards_order: cardsOrder,
    }
  );

  return response.data.data;
};

const deleteCard = async ({
  workspaceId,
  boardId,
  statusId,
  cardId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
}) => {
  await api.delete(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}`
  );
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */
export const useCard = ({
  workspaceId,
  boardId,
  statusId,
  cardId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
}) => {
  const { data: card, isLoading } = useQuery({
    queryKey: [
      "workspaces",
      workspaceId,
      "boards",
      boardId,
      "statuses",
      statusId,
      "cards",
      cardId,
    ],
    queryFn: () =>
      getCard({
        workspaceId,
        boardId,
        statusId,
        cardId,
      }),
  });

  return {
    card,
    isLoading,
  };
};

export const useCardComments = ({
  workspaceId,
  boardId,
  statusId,
  cardId,
}: {
  workspaceId: number;
  boardId: number;
  statusId: number;
  cardId: number;
}) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: [
      "workspaces",
      workspaceId,
      "boards",
      boardId,
      "statuses",
      statusId,
      "cards",
      cardId,
      "comments",
    ],
    queryFn: () =>
      getCardComments({
        workspaceId,
        boardId,
        statusId,
        cardId,
      }),
  });

  return {
    comments,
    isLoading,
  };
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCard,
    onSuccess(status, { workspaceId, boardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    createCard: mutate,
    isLoading: isPending,
  };
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateCard,
    onSuccess(status, { workspaceId, boardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId?.toString(),
          "boards",
          boardId?.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    updateCard: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useCreateCardComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: createCardComment,
    onSuccess(status, { workspaceId, boardId, statusId, cardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId,
          "boards",
          boardId,
          "statuses",
          statusId,
          "cards",
          cardId,
        ],
      });
    },
  });

  return {
    createCardComment: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useReorderCards = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: reorderCards,
    onMutate({ workspaceId, boardId }) {
      queryClient.cancelQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
        ],
      });
    },
    onSuccess(status, { workspaceId, boardId }) {
      // queryClient.invalidateQueries({
      //   queryKey: [
      //     "workspaces",
      //     workspaceId.toString(),
      //     "boards",
      //     boardId.toString(),
      //   ],
      // });
    },
  });

  const optimistacallyReorderCards = ({
    workspaceId,
    boardId,
    overStatusId,
    activeCard,
  }: {
    workspaceId: string;
    boardId: string;
    overStatusId: number;
    activeCard: App.Models.Card;
  }) => {
    const reorderedStatuses = queryClient.setQueryData<App.Models.Status[]>(
      ["workspaces", workspaceId, "boards", boardId, "statuses"],
      (statuses = []) => {
        // find the index of the active card status
        const activeCardStatusIndex = statuses.findIndex(
          (status) => status.id === activeCard.statusId
        );

        // find the index of the over status
        const overStatusIndex = statuses.findIndex(
          (status) => status.id === overStatusId
        );

        // remove active card from old status
        statuses[activeCardStatusIndex].cards = statuses[
          activeCardStatusIndex
        ].cards?.filter((card) => card.id !== activeCard.id);

        // add card to over card status
        activeCard.statusId = overStatusId;
        statuses[overStatusIndex].cards?.unshift(activeCard);

        return statuses;
      }
    );
    return reorderedStatuses
      ?.find((status) => status.id === overStatusId)
      ?.cards?.reduce((acc, card, idx) => ({ ...acc, [card.id]: idx }), {});
  };

  return {
    reorderCards: mutate,
    optimistacallyReorderCards,
    isLoading: isPending,
  };
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCard,
    onSuccess(_, { workspaceId, boardId }) {
      return queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId?.toString(),
          "boards",
          boardId?.toString(),
          "statuses",
        ],
      });
    },
  });

  return {
    deleteCard: mutateAsync,
    isLoading: isPending,
  };
};
