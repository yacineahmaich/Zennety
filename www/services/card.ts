import { CreateCard } from "@/components/card/CreateCard";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  ...card
}: Partial<CreateCard> & { cardId: number }): Promise<App.Models.Card> => {
  const response = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/statuses/${statusId}/cards/${cardId}`,
    card
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
      queryClient.invalidateQueries({
        queryKey: [
          "workspaces",
          workspaceId.toString(),
          "boards",
          boardId.toString(),
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
      queryClient.invalidateQueries({
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
    createCardComment: mutate,
    isLoading: isPending,
    variables,
  };
};
