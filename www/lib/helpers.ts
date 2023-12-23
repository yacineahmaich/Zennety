/**
 *  Get a single error message from the api error response
 * @param obj api error response object
 * @returns string
 */

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
  workspaces: App.Models.Workspace[] = [],
  user: App.Models.User
) {
  const groupedWorkspaces = workspaces?.reduce(
    (
      groups: { owner: App.Models.Workspace[]; guest: App.Models.Workspace[] },
      workspace
    ) => {
      const member = workspace.members?.find(
        (member) => member.id === user?.id
      );

      if (member?.role === "owner") {
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
