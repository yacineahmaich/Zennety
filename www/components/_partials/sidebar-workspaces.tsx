import { Accordion } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkspaceAccordion from "@/components/workspace/workspace-accordion";
import { route } from "@/lib/routes";
import { useMyWorkspaces } from "@/services";
import { useOrganization } from "@/services/organization";
import { isMatch } from "micromatch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = { collapsed?: boolean };

const SidebarWorkspaces = ({ collapsed }: Props) => {
  const router = useRouter();
  const { workspaces } = useMyWorkspaces();
  const { activeOrganizationId } = useOrganization();
  const { workspaceId } = router.query as { workspaceId: string };

  const scopedWorkspaces = useMemo(() => {
    if (!workspaces?.length) {
      return [];
    }
    if (activeOrganizationId == null) {
      return workspaces;
    }
    return workspaces.filter((w) => w.organization_id === activeOrganizationId);
  }, [workspaces, activeOrganizationId]);

  const workspace = scopedWorkspaces?.find((w) => String(w.id) === workspaceId);

  if (!isMatch(router.pathname, ["/app", "/app/w/**", "/app/o/**"])) {
    return <div className="flex-1" />;
  }

  if (collapsed) {
    return (
      <div className="-mx-1 flex-1 space-y-1 overflow-y-auto py-2">
        {scopedWorkspaces?.map((ws) => (
          <Tooltip key={ws.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={route("workspace", ws.id)}
                aria-label={ws.name}
                className="flex h-9 w-full items-center justify-center rounded-md hover:bg-accent"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ws.avatar} alt={ws.name} />
                  <AvatarFallback>{ws.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{ws.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <Accordion
      value={workspaceId}
      type="single"
      collapsible
      className="-mx-4 flex-1 overflow-y-auto px-2 py-2"
    >
      <div>
        {workspace ? (
          <WorkspaceAccordion workspace={workspace} />
        ) : (
          scopedWorkspaces?.map((ws) => (
            <WorkspaceAccordion key={ws.id} workspace={ws} />
          ))
        )}
      </div>
    </Accordion>
  );
};

export default SidebarWorkspaces;
