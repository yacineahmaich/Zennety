import { useCan } from "@/hooks/useCan";
import { Namespace } from "@/types/enums";
import { FolderSearchIcon, PenSquareIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import CreateBoard from "../board/CreateBoard";
import { Button } from "../ui/button";

const EmptyWorkspace = ({
  workspace,
  withIcon = false,
}: {
  workspace: App.Models.Workspace;
  withIcon?: boolean;
}) => {
  const { t } = useTranslation("common");
  const canCreate = useCan("update", Namespace.WORKSPACE, workspace.id);

  return (
    <div className="col-span-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
      {withIcon && <FolderSearchIcon size={85} />}

      <div className="my-4 space-y-1">
        <h4 className="text-lg font-semibold">{t("empty-workspace-title")}</h4>
        {canCreate && (
          <p className="text-sm">{t("empty-workspace-subtitle")}</p>
        )}
      </div>

      {canCreate && (
        <CreateBoard
          openTrigger={
            <Button size="sm" variant="secondary">
              <PenSquareIcon size={16} className="mr-2" />
              {t("create-new-board")}
            </Button>
          }
          workspace={workspace}
        />
      )}
    </div>
  );
};

export default EmptyWorkspace;
