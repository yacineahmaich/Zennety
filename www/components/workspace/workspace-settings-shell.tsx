import Loader from "@/components/shared/loader";
import WorkspaceBanner from "@/components/workspace/workspace-banner";
import type { WorkspaceSettingsSection } from "@/components/workspace/workspace-settings-sections";
import { useWorkspace } from "@/services";
import { IWorkspace } from "@/types/models";
import { SettingsIcon } from "lucide-react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  activeSection: WorkspaceSettingsSection;
  pageTitle: string;
  children: (workspace: IWorkspace) => ReactNode;
};

const WorkspaceSettingsShell = ({
  activeSection,
  pageTitle,
  children,
}: Props) => {
  const router = useRouter();

  const workspaceIdParam = router.query.workspaceId;
  const workspaceId =
    router.isReady &&
    typeof workspaceIdParam === "string" &&
    workspaceIdParam.length > 0
      ? workspaceIdParam
      : null;

  if (!router.isReady || workspaceId == null) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <WorkspaceSettingsShellContent
      workspaceId={workspaceId}
      activeSection={activeSection}
      pageTitle={pageTitle}
    >
      {children}
    </WorkspaceSettingsShellContent>
  );
};

function WorkspaceSettingsShellContent({
  workspaceId,
  activeSection,
  pageTitle,
  children,
}: {
  workspaceId: string;
  activeSection: WorkspaceSettingsSection;
  pageTitle: string;
  children: (workspace: IWorkspace) => ReactNode;
}) {
  const { workspace } = useWorkspace(workspaceId);

  return (
    <>
      <div>
        <WorkspaceBanner
          workspace={workspace}
          settingsActiveSection={activeSection}
        />
        <div className="py-4">
          <span className="mb-4 flex items-center">
            <SettingsIcon size={20} className="mr-2" />
            <h2 className="text-lg font-semibold">{pageTitle}</h2>
          </span>
          <div className="pl-4">{children(workspace)}</div>
        </div>
      </div>
      <NextSeo
        title={`${workspace.name} — ${pageTitle}`}
        description={workspace.description ?? workspace.name}
      />
    </>
  );
}

export default WorkspaceSettingsShell;
