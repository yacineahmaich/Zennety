import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { route } from "@/lib/routes";
import { useDeleteWorkspace } from "@/services";
import { IWorkspace } from "@/types/models";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = { workspace: IWorkspace };

const DeleteWorkspace = ({ workspace }: Props) => {
  const { t } = useTranslation("common");
  const [confirmText, setConfirmationText] = useState("");
  const [open, setOpen] = useState(false);

  const { deleteWorkspace, isLoading } = useDeleteWorkspace();

  const confirmationWord = `w/${workspace.name}`;

  const handleConfirmDelete = () => {
    deleteWorkspace(
      { workspaceId: workspace.id },
      {
        onSuccess() {
          window.location.href = route("app");
        },
      }
    );
  };

  return (
    <div className="-ml-4 flex flex-col rounded-lg border border-destructive bg-destructive/10 p-4">
      <div>
        <h4 className="text-sm font-semibold">{t("danger-zone")}</h4>
        <p className="mb-4 mt-1 text-xs">{t("permanent-action")}</p>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive-outline" className="w-fit">
            {t("delete-workspace")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmation")}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-foreground">
              <div>
                This will permanently delete the
                <span className="mx-2 rounded bg-accent px-1 font-semibold">
                  {confirmationWord}
                </span>
                and its boards, statuses, cards, activities and remove all
                collaborator associations.
              </div>
              <div className="space-y-2">
                <div>
                  To confirm, type
                  <span className="mx-2 rounded bg-accent px-1 font-semibold">
                    {confirmationWord}
                  </span>
                  in the box below
                </div>
                <Input
                  value={confirmText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel className="w-1/3" disabled={isLoading}>
              {t("cancel")}
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="w-2/3"
              disabled={confirmText !== confirmationWord || isLoading}
              onClick={handleConfirmDelete}
            >
              {isLoading ? t("delelting") : t("delete-workspace")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DeleteWorkspace;
