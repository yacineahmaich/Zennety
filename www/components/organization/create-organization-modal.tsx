import {
  CreateOrganizationForm,
  CreateOrganizationFormValues,
} from "@/components/organization/create-organization-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { switchOrganization } from "@/lib/active-organization";
import { useUser } from "@/services";
import { useCreateOrganization } from "@/services/organization";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo } from "react";

export type CreateOrganizationModalMode = "onboarding" | "create";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: CreateOrganizationModalMode;
};

export function CreateOrganizationModal({ open, onOpenChange, mode }: Props) {
  const { t } = useTranslation("common");
  const { user } = useUser();
  const { createOrganization, isLoading } = useCreateOrganization();
  const required = mode === "onboarding";

  const nameDefault = useMemo(() => {
    if (!user?.name) {
      return undefined;
    }
    return `${user.name}'s Organization`;
  }, [user?.name]);

  const onSubmit = useCallback(
    (values: CreateOrganizationFormValues) => {
      createOrganization(
        {
          name: values.name,
          description: values.description,
        },
        {
          onSuccess(data) {
            if (mode === "create" && data && "id" in data && data.id) {
              switchOrganization(data.id);
              return;
            }
            onOpenChange(false);
          },
        }
      );
    },
    [createOrganization, mode, onOpenChange, switchOrganization]
  );

  const title =
    mode === "onboarding"
      ? t("onboarding-title")
      : t("create-new-organization");
  const description =
    mode === "onboarding"
      ? t("onboarding-subtitle")
      : t("create-organization-modal-subtitle");
  const submitLabel = mode === "onboarding" ? t("continue") : t("create");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={!required}
        onPointerDownOutside={(e) => {
          if (required) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (required) {
            e.preventDefault();
          }
        }}
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm
          key={`${mode}-${open}`}
          disabled={isLoading}
          nameDefault={nameDefault}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
