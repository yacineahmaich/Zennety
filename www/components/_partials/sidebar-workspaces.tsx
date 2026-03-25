import { Accordion } from "@/components/ui/accordion";
import WorkspaceAccordion from "@/components/workspace/workspace-accordion";
import { useMyWorkspaces } from "@/services";
import { useOrganization } from "@/services/organization";
import { isMatch } from "micromatch";
import { useRouter } from "next/router";
import { useMemo } from "react";

const SidebarWorkspaces = () => {
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

  if (!isMatch(router.pathname, ["/app", "/app/w/**"])) {
    return <div className="flex-1" />;
  }

  return (
    <Accordion
      value={workspaceId}
      type="single"
      collapsible
      className="-mx-4 flex-1 overflow-y-auto"
    >
      {
        <div className="px-2">
          {workspace ? (
            <WorkspaceAccordion workspace={workspace} />
          ) : (
            scopedWorkspaces?.map((ws) => (
              <WorkspaceAccordion key={ws.id} workspace={ws} />
            ))
          )}
        </div>
      }
    </Accordion>
  );
};

export default SidebarWorkspaces;
