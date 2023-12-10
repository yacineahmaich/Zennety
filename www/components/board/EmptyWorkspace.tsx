import { PenSquareIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Button } from "../ui/button";
import CreateBoard from "./CreateBoard";

const EmptyWorkspace = ({ workspace }: { workspace: App.Models.Workspace }) => {
  const { t } = useTranslation("common");

  return (
    <div className="col-span-full flex flex-col items-center p-6 text-center">
      <h4 className="mb-2 text-lg font-semibold text-muted-foreground">
        {t("empty-workspace-title")}
      </h4>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("empty-workspace-subtitle")}
      </p>
      <CreateBoard
        openTrigger={
          <Button size="sm" variant="secondary">
            <PenSquareIcon size={16} className="mr-2" />
            {t("create-new-board")}
          </Button>
        }
        workspace={workspace}
      />
    </div>
  );
};

export default EmptyWorkspace;
