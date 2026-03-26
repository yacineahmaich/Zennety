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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransferOrganizationOwnership } from "@/services/organization";
import { Role } from "@/types/enums";
import { IMember, IOrganization } from "@/types/models";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

type Props = {
  organization: IOrganization;
};

const OrganizationOwnershipTransfer = ({ organization }: Props) => {
  const { t } = useTranslation("common");
  const [memberId, setMemberId] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmationText] = useState("");

  const { transferOrganizationOwnership, isLoading } =
    useTransferOrganizationOwnership();

  const owner = organization.members?.find((m) => m.role === Role.OWNER) as
    | IMember
    | undefined;

  const transferCandidates =
    organization.members?.filter((member) =>
      [Role.ADMIN, Role.OWNER].includes(member.role as Role)
    ) ?? [];

  const hasAdminRecipient = transferCandidates.some(
    (m) => m.role === Role.ADMIN
  );

  useEffect(() => {
    setMemberId(undefined);
  }, [organization.id]);

  const selectedMembershipId = memberId ?? owner?.id?.toString();

  const handleTransferOwnership = () => {
    if (!memberId || memberId === owner?.id?.toString()) return;

    transferOrganizationOwnership(
      {
        organizationId: organization.id,
        memberId,
      },
      {
        onSuccess() {
          setOpen(false);
          window.location.reload();
        },
      }
    );
  };

  const confirmationWord = `o/${organization.name}`;

  const disabled =
    !selectedMembershipId ||
    selectedMembershipId === owner?.id?.toString() ||
    !hasAdminRecipient;

  return (
    <div className="-ml-4 rounded-lg border border-orange-400 bg-orange-100 p-4 dark:bg-transparent">
      <h4 className="text-sm font-semibold">{t("organization-ownership")}</h4>
      <p className="mb-4 mt-1 text-xs">{t("transfer-organization-to-admin")}</p>
      <Select
        value={selectedMembershipId || undefined}
        onValueChange={setMemberId}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder={t("select-new-owner")} />
        </SelectTrigger>
        <SelectContent>
          {transferCandidates.map((member) => (
            <SelectItem value={member.id.toString()} key={member.id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 object-cover">
                  <AvatarImage src={member.profile?.avatar} />
                  <AvatarFallback>
                    {member.profile?.name?.slice(0, 2).toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{member.profile?.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild disabled={disabled}>
          <Button variant="warning-outline" className="mt-2">
            {t("transfer-ownership")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmation")}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div>{t("transfer-organization-confirm-lead")}</div>
              <div className="space-y-2">
                <div>
                  {t("transfer-organization-confirm-type")}
                  <span className="mx-2 rounded bg-accent px-1 font-semibold">
                    {confirmationWord}
                  </span>
                  {t("transfer-organization-confirm-suffix")}
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
              onClick={handleTransferOwnership}
            >
              {isLoading ? t("transfering") : t("transfer-ownership")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrganizationOwnershipTransfer;
