import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { groupWorkspacesByOwnership } from "@/lib/helpers";
import { route } from "@/lib/routes";
import { useMyWorkspaces, useUser } from "@/services";
import { ChevronDownIcon, KanbanSquareIcon, LayersIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const WorkspacesDropdown = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useUser();
  let { workspaces, isLoading } = useMyWorkspaces();
  const { workspaceId } = router.query as { workspaceId: string };

  const currentWorkspace = useMemo(() => {
    return workspaces?.find(
      (worksapce) => worksapce.id.toString() === workspaceId
    );
  }, [workspaceId]);

  const groupedWorkspaces = useMemo(() => {
    return groupWorkspacesByOwnership(workspaces, user);
  }, [workspaces?.length]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <LayersIcon size={20} className="mr-2" />
          <span>{currentWorkspace?.name || t("my-workspaces")}</span>
          <ChevronDownIcon size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        {!workspaces?.length && (
          <DropdownMenuItem disabled>
            <div className="flex w-full justify-center py-4">
              <span>{t("nothing-here")}</span>
            </div>
          </DropdownMenuItem>
        )}
        {groupedWorkspaces.owner.length > 0 && (
          <>
            <DropdownMenuLabel>{t("my-workspaces")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {groupedWorkspaces.owner.map((workspace) => (
                <DropdownMenuItem key={workspace.id} asChild>
                  <Link
                    href={route("workspace", workspace.id)}
                    className="cursor-pointer"
                  >
                    <KanbanSquareIcon size={16} className="mr-2" />
                    <span>{workspace.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
        {groupedWorkspaces.guest.length > 0 && (
          <>
            <DropdownMenuLabel>{t("guest-workspaces")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {groupedWorkspaces.guest.map((workspace) => (
                <DropdownMenuItem key={workspace.id} asChild>
                  <Link
                    href={route("workspace", workspace.id)}
                    className="cursor-pointer"
                  >
                    <KanbanSquareIcon size={16} className="mr-2" />
                    <span>{workspace.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspacesDropdown;
