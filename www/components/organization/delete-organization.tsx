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
import {
  ACTIVE_ORG_STORAGE_KEY,
  readStoredActiveOrganizationId,
} from "@/lib/active-organization";
import { route } from "@/lib/routes";
import { useDeleteOrganization } from "@/services/organization";
import { IOrganization } from "@/types/models";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "sonner";

type Props = { organization: IOrganization };

const DeleteOrganization = ({ organization }: Props) => {
  const { t } = useTranslation("common");
  const [confirmText, setConfirmationText] = useState("");
  const [open, setOpen] = useState(false);

  const { deleteOrganization, isLoading } = useDeleteOrganization();

  const confirmationWord = `o/${organization.name}`;

  const handleConfirmDelete = () => {
    deleteOrganization(
      { organizationId: organization.id },
      {
        onSuccess() {
          const stored = readStoredActiveOrganizationId();
          if (stored === organization.id) {
            window.localStorage.removeItem(ACTIVE_ORG_STORAGE_KEY);
          }
          window.location.href = route("app");
        },
        onError() {
          toast.error(t("something-went-wrong"), {
            description: t("delete-organization-blocked-hint"),
          });
        },
      }
    );
  };

  return (
    <div className="-ml-4 flex flex-col rounded-lg border border-destructive bg-destructive/10 p-4">
      <div>
        <h4 className="text-sm font-semibold">{t("danger-zone")}</h4>
        <p className="mb-4 mt-1 text-xs">{t("delete-organization-warning")}</p>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive-outline" className="w-fit">
            {t("delete-organization")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmation")}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-foreground">
              <div>
                {t("delete-organization-confirm-lead")}
                <span className="mx-2 rounded bg-accent px-1 font-semibold">
                  {confirmationWord}
                </span>
                {t("delete-organization-confirm-tail")}
              </div>
              <div className="space-y-2">
                <div>
                  {t("delete-organization-type-confirm")}
                  <span className="mx-2 rounded bg-accent px-1 font-semibold">
                    {confirmationWord}
                  </span>
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
              {isLoading ? t("delelting") : t("delete-organization")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteOrganization;
