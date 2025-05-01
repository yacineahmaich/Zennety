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
import { ChevronDownIcon, KanbanSquareIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const WorkspacesDropdown = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useUser();
  let { workspaces } = useMyWorkspaces();
  const { workspaceId } = router.query as { workspaceId: string };

  const currentWorkspace = workspaces?.find(
    (w) => String(w.id) === workspaceId
  );

  const groupedWorkspaces = useMemo(() => {
    return groupWorkspacesByOwnership(workspaces, user);
  }, [workspaces?.length]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="space-x-2">
          {currentWorkspace ? (
            <Avatar className="h-6 w-6 rounded">
              <AvatarImage
                src={currentWorkspace.avatar}
                alt={currentWorkspace.name}
              />
              <AvatarFallback>{currentWorkspace.name[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <KanbanSquareIcon className="mr-2 h-6 w-6" />
          )}
          <span>{currentWorkspace?.name || t("my-workspaces")}</span>
          <ChevronDownIcon size={16} className="ml-2" />
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
                    className="cursor-pointer space-x-2"
                  >
                    {/* <KanbanSquareIcon size={16} className="mr-2" /> */}
                    <Avatar className="h-6 w-6 rounded">
                      <AvatarImage
                        src={workspace.avatar}
                        alt={workspace.name}
                      />
                      <AvatarFallback>{workspace.name[0]}</AvatarFallback>
                    </Avatar>
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
