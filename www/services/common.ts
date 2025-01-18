import { api } from "@/lib/api";
import { ResourceType } from "@/types/helpers";
import { IWorkspace } from "@/types/models";
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
      const previousBoards = queryClient.getQueryData(["my-workspaces"]);
      queryClient.setQueryData<IWorkspace[]>(
        ["my-workspaces"],
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
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["my-workspaces"],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-workspaces"] });
    },
  });

  return {
    bookmarkItem: mutate,
    isLoading: isPending,
  };
};
