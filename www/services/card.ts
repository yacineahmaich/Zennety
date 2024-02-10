import { CreateCard } from "@/components/board/card/CreateCard";
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
