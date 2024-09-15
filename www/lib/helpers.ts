/**
 *  Get a single error message from the api error response
 * @param obj api error response object
 * @returns string
 */

import { Role } from "@/types/enums";
import { IUser, IWorkspace } from "@/types/models";

export function getFirstApiErrorMsg(error: ApiError) {
  let errorMessage = error.message;

  if (error.errors) {
    errorMessage =
      Object.entries(error.errors)
        .flatMap(([_, value]) => value)
        .at(0) || errorMessage;
  }

  return errorMessage;
}

/**
 *  Group an array of worksapces by ownership via user role
 * @param obj api error response object
 * @returns string
 */
export function groupWorkspacesByOwnership(
  workspaces: IWorkspace[] = [],
  user: IUser
) {
  const groupedWorkspaces = workspaces?.reduce(
    (groups: { owner: IWorkspace[]; guest: IWorkspace[] }, workspace) => {
      const member = workspace.members?.find(
        (member) => member.userId === user?.id
      );

      if (member?.role === Role.OWNER) {
        groups.owner.push(workspace);
      } else {
        groups.guest.push(workspace);
      }

      return groups;
    },
    { owner: [], guest: [] }
  );

  return groupedWorkspaces;
}

export function getPinnedBoard(workspaces: IWorkspace[] = []) {
  return workspaces.flatMap(
    (workspace) => (workspace.boards || [])?.filter((b) => b.pinned)
  );
}
