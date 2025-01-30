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
import { useTransferWorkspaceOwnership } from "@/services";
import { Role } from "@/types/enums";
import { IMember, IWorkspace } from "@/types/models";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
  workspace: IWorkspace;
};

const WorkspaceOwnershipTransfer = ({ workspace }: Props) => {
  const { t } = useTranslation("common");
  const [memberId, setMemberId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmationText] = useState("");

  const { transferWorkspaceOwnership, isLoading } =
    useTransferWorkspaceOwnership();

  const owner = workspace.members?.find(
    (m) => m.role === Role.OWNER
  ) as IMember;

  const handleTrasferOwnership = () => {
    if (!memberId || memberId === owner.id?.toString()) return;

    transferWorkspaceOwnership(
      {
        workspaceId: workspace.id,
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

  const confirmationWord = `w/${workspace.name}`;

  const disabled = !memberId || memberId === owner?.userId?.toString();

  return (
    <div className="-ml-4 rounded-lg border border-orange-400 bg-orange-100 p-4 dark:bg-transparent">
      <h4 className="text-sm font-semibold">{t("workspace-ownership")}</h4>
      <div className="mb-4 mt-1 flex items-center gap-2">
        <p className="text-xs">{t("transform-workspace-to-an-admin")}</p>
      </div>
      <Select
        defaultValue={owner?.id?.toString()}
        onValueChange={(value) => setMemberId(value)}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {workspace.members
            ?.filter((member) =>
              [Role.ADMIN, Role.OWNER].includes(member.role as Role)
            )
            .map((member) => (
              <SelectItem value={member.id.toString()} key={member.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 object-cover">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {member?.profile?.name.slice(0, 2).toUpperCase()}
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
              onClick={handleTrasferOwnership}
            >
              {isLoading ? t("transfering") : t("transfer-ownership")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default WorkspaceOwnershipTransfer;
