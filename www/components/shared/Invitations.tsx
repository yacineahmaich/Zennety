import { useCan } from "@/hooks/useCan";
import { useDebounce } from "@/hooks/useDebounce";
import { roles } from "@/lib/constants";
import { useInvitations } from "@/services";
import { ResourceType } from "@/types/helpers";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ConfirmationDialog } from "./ConfirmationDialog";

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
    <div className="p-8">
      <span className="mb-4 flex items-center">
        <MailOpenIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">
          {t("invitations")} ({invitations?.length || 0})
        </h2>
      </span>
      <div>
        <div className="flex justify-between gap-4">
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
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-3">
          {invitations?.map((invitation) => (
            <Invitation
              key={invitation.id}
              invitation={invitation}
              resourceId={resourceId}
              resourceType={resourceType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Invitation = ({
  invitation,
  resourceId,
  resourceType,
}: {
  invitation: App.Models.Invitation;
  resourceId: number;
  resourceType: ResourceType;
}) => {
  const { t } = useTranslation("common");
  const canUpdate = useCan("update", resourceType, resourceId);

  const expirationDate = format(new Date(invitation.expiresAt), "d MMMM yyyy");

  return (
    <Card className="flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png" />
          <AvatarFallback>{invitation.invited?.name}</AvatarFallback>
        </Avatar>
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
            desc={t("delete-member-desc")}
            onConfirm={
              () => {}
              //   deleteMember({ id: member.id, resourceType, resourceId })
            }
            openTrigger={
              <Button size="sm" variant="destructive" className="p-2">
                <TrashIcon size={16} />
              </Button>
            }
          />
        )}
      </div>
    </Card>
  );
};

export default Invitations;
