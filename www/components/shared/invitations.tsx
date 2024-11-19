import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCan } from "@/hooks/use-can";
import { useDebounce } from "@/hooks/use-debounce";
import { roles } from "@/lib/constants";
import { useDeleteInvitation, useInvitations } from "@/services";
import { ResourceType } from "@/types/helpers";
import { IInvitation } from "@/types/models";
import { format } from "date-fns";
import {
  CalendarX2Icon,
  ListFilterIcon,
  MailOpenIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationDialog } from "./confirmation-dialog";
import NoRecords from "./no-records";
import UserAvatar from "./user-avatar";

const Invitations = ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  const { t } = useTranslation("common");
  const [role, setRole] = useState("all");
  const [_search, setSearch] = useState("");
  const search = useDebounce(_search, 0.3);

  const { invitations, pagination } = useInvitations(resourceType, resourceId, {
    search,
    role: role === "all" ? "" : role,
  });

  return (
    <div>
      <span className="mb-4 flex items-center">
        <MailOpenIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">
          {t("invitations")} ({invitations?.length || 0})
        </h2>
      </span>
      <div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Input
            placeholder={t("search-by-username-or-email")}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Select onValueChange={setRole}>
            <SelectTrigger className="w-[250px]">
              <div className="flex items-center gap-2">
                <ListFilterIcon size={16} />
                <SelectValue placeholder="Filter by Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-1 text-sm">
                  <span>{t("all")}</span>
                </div>
              </SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{t(role.toLowerCase())}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {invitations?.map((invitation) => (
            <Invitation
              key={invitation.id}
              invitation={invitation}
              resourceId={resourceId}
              resourceType={resourceType}
            />
          ))}
        </div>
        {invitations?.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};

const Invitation = ({
  invitation,
  resourceId,
  resourceType,
}: {
  invitation: IInvitation;
  resourceId: number;
  resourceType: ResourceType;
}) => {
  const { t } = useTranslation("common");
  const { deleteInvitation, isLoading } = useDeleteInvitation();
  const canUpdate = useCan("update", resourceType, resourceId);

  const expirationDate = format(new Date(invitation.expiresAt), "d MMMM yyyy");

  if (!invitation.invited) return;

  return (
    <Card className="flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <UserAvatar user={invitation.invited} className="h-10 w-10" />
        <div className="text-xs">
          <h2 className="font-semibold">{invitation.invited?.name}</h2>
          <p>{invitation.invited?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end justify-center gap-1 text-xs">
          <p className="g-1 flex items-center">
            <UserIcon size={14} />
            {invitation.role}
          </p>
          <p
            className="g-1 flex items-center"
            title={`Expires at ${expirationDate}`}
          >
            <CalendarX2Icon size={14} />
            {expirationDate}
          </p>
        </div>
        {canUpdate && (
          <ConfirmationDialog
            desc={t("delete-resource-desc", { resource: t("invitation") })}
            onConfirm={() =>
              deleteInvitation(
                { token: invitation.token },
                {
                  onSuccess() {
                    toast.success(t("success"), {
                      description: t("deleted", {
                        resource: t("invitation"),
                      }),
                    });
                  },
                }
              )
            }
            openTrigger={
              <Button size="sm" variant="destructive" className="p-2">
                <TrashIcon size={16} />
              </Button>
            }
            disabled={isLoading}
          />
        )}
      </div>
    </Card>
  );
};

export default Invitations;
