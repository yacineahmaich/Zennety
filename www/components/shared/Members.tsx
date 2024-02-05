import { useCan } from "@/hooks/useCan";
import { useDebounce } from "@/hooks/useDebounce";
import { roles } from "@/lib/constants";
import { useDeleteMember, useMembers, useUpdateMemberRole } from "@/services";
import { Role } from "@/types/enums";
import { ResourceType } from "@/types/helpers";
import {
  ListFilterIcon,
  LoaderIcon,
  TrashIcon,
  UserCogIcon,
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

const Members = ({
  resourceType,
  resourceId,
}: {
  resourceType: ResourceType;
  resourceId: number;
}) => {
  const { t } = useTranslation("common");
  const [role, setRole] = useState("");
  const [_search, setSearch] = useState("");
  const search = useDebounce(_search, 0.3);

  const { data } = useMembers(resourceType, resourceId, {
    search,
    role: role === "all" ? "" : role,
  });

  if (!data) return null;

  const { data: members, meta } = data;

  return (
    <div className="p-8">
      <span className="mb-4 flex items-center">
        <UserIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">
          {t("members")} ({members?.length || 0})
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
          {members.map((member) => (
            <Member
              key={member.id}
              member={member}
              resourceId={resourceId}
              resourceType={resourceType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Member = ({
  member,
  resourceId,
  resourceType,
}: {
  member: App.Models.Member;
  resourceId: number;
  resourceType: ResourceType;
}) => {
  const { t } = useTranslation("common");
  const { deleteMember, isLoading: isDeleting } = useDeleteMember();
  const { updateMemberRole, isLoading: isUpdatingRole } = useUpdateMemberRole();
  const canUpdate = useCan("update", resourceType, resourceId);

  return (
    <Card className="flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png" />
          <AvatarFallback>{member.profile.name}</AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <h2 className="font-semibold">{member.profile.name}</h2>
          <p>{member.profile.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Select
          value={member.role}
          disabled={member.role === Role.OWNER || !canUpdate || isUpdatingRole}
          onValueChange={(role) =>
            updateMemberRole({ id: member.id, role, resourceType, resourceId })
          }
        >
          <SelectTrigger className="h-7 text-xs">
            {isUpdatingRole ? (
              <LoaderIcon size={14} className="animate-spin" />
            ) : (
              <SelectValue placeholder="Select a role" />
            )}
          </SelectTrigger>
          <SelectContent>
            {member.role === Role.OWNER && (
              <SelectItem value={Role.OWNER} disabled>
                <div className="flex h-4 items-center gap-1 text-xs">
                  <UserCogIcon size={14} />
                  <span>{t(Role.OWNER.toLowerCase())}</span>
                </div>
              </SelectItem>
            )}
            {roles
              .filter((r) => r !== Role.OWNER)
              .map((role) => (
                <SelectItem key={role} value={role}>
                  <div className="flex h-4 items-center gap-1 text-xs">
                    <UserCogIcon size={14} />
                    <span>{t(role.toLowerCase())}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {canUpdate && (
          <ConfirmationDialog
            desc={t("delete-member-desc")}
            onConfirm={() =>
              deleteMember({ id: member.id, resourceType, resourceId })
            }
            disabled={isDeleting}
            openTrigger={
              <Button size="sm" variant="destructive" className="h-6 p-2">
                <TrashIcon size={16} />
              </Button>
            }
          />
        )}
      </div>
    </Card>
  );
};

export default Members;
