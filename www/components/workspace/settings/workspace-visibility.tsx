import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateWorkspace } from "@/services";
import { Visibility } from "@/types/enums";
import { IWorkspace } from "@/types/models";
import { Globe2Icon, LoaderIcon, LockIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

const WorkspaceVisibility = ({ workspace }: { workspace: IWorkspace }) => {
  const { t } = useTranslation("common");
  const { updateWorkspace, isLoading } = useUpdateWorkspace();

  const handleVisibilityChange = (visibility: string) => {
    updateWorkspace({
      workspaceId: workspace.id,
      data: {
        visibility,
      },
    });
  };

  return (
    <div>
      <h4 className="text-sm font-semibold">{t("workspace-visibility")}</h4>
      <div className="mb-4 mt-1 flex items-center gap-2">
        <p className="text-xs">
          {workspace.visibility === Visibility.PRIVATE &&
            t("private-workspace-description")}
          {workspace.visibility === Visibility.PUBLIC &&
            t("public-workspace-description")}
        </p>
      </div>
      <Select
        value={workspace.visibility}
        onValueChange={handleVisibilityChange}
      >
        <SelectTrigger className="w-fit">
          {isLoading ? (
            <LoaderIcon size={14} className="animate-spin" />
          ) : (
            <SelectValue placeholder="Select a role" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Visibility.PRIVATE}>
            <div className="flex items-center gap-2">
              <LockIcon size={16} /> <span>{Visibility.PRIVATE}</span>
            </div>
          </SelectItem>
          <SelectItem value={Visibility.PUBLIC}>
            <div className="flex items-center gap-2">
              <Globe2Icon size={16} /> <span>{Visibility.PUBLIC}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceVisibility;
