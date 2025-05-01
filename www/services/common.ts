import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { IBoard, IWorkspace } from "@/types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const bookmarkItem = async ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  await api.put(`/bookmarks/${resourceType}/${resourceId}`);
};

export const useBookmarkItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: bookmarkItem,
    onMutate(vars) {
      queryClient.setQueryData<IWorkspace[]>(
        ["workspaces", "my"],
        (workspaces) => {
          return workspaces?.map((workspace) => {
            return {
              ...workspace,
              boards: workspace.boards?.map((board) => {
                if (
                  vars.resourceType !== "board" ||
                  vars.resourceId !== board.id
                )
                  return board;

                queryClient.setQueryData<IBoard>(
                  [
                    "workspaces",
                    String(board.workspaceId),
                    "boards",
                    String(board.id),
                  ],
                  (oldBoard) => {
                    if (!oldBoard) return undefined;

                    return {
                      ...oldBoard,
                      pinned: !oldBoard.pinned,
                    };
                  }
                );

                return {
                  ...board,
                  pinned: !board.pinned,
                };
              }),
            };
          });
        }
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces", "my"] });
    },
  });

  return {
    bookmarkItem: mutate,
    isLoading: isPending,
  };
};
