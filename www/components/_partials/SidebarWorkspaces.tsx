import { useMyWorkspaces } from "@/services";
import { isMatch } from "micromatch";
import { useRouter } from "next/router";
import { Accordion } from "../ui/accordion";
import WorkspaceAccordion from "../workspace/WorkspaceAccordion";

const SidebarWorkspaces = () => {
  const router = useRouter();
  const { workspaces } = useMyWorkspaces();
  const { workspaceId } = router.query as { workspaceId: string };

  const workspace = workspaces?.find(
    (workspace) => String(workspace.id) === workspaceId
  );

  if (!isMatch(router.pathname, ["/app", "/app/w/**"])) {
    return <div className="flex-1" />;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="-mx-4 flex-1 overflow-y-auto"
    >
      {
        <div className="px-2">
          {workspace ? (
            <WorkspaceAccordion workspace={workspace} />
          ) : (
            workspaces?.map((workspace) => (
              <WorkspaceAccordion key={workspace.id} workspace={workspace} />
            ))
          )}
        </div>
      }
    </Accordion>
  );
};

export default SidebarWorkspaces;
