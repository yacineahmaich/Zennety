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
import Loader from "./Loader";
import UserAvatar from "./UserAvatar";

const Members = ({
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

  const { members, pagination, isLoading } = useMembers(
    resourceType,
    resourceId,
    {
      search,
      role: role === "all" ? "" : role,
    }
  );

  return (
    <div>
      <span className="mb-4 flex items-center">
        <UserIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">
          {t("members")} ({members?.length || 0})
        </h2>
      </span>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
              {members?.map((member) => (
                <Member
                  key={member.id}
                  member={member}
                  resourceId={resourceId}
                  resourceType={resourceType}
                />
              ))}
            </div>
          </>
        )}
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
        <UserAvatar user={member.profile} className="h-10 w-10" />
        <div className="text-xs">
          <h2 className="font-semibold">{member.profile.name}</h2>
          <p>{member.profile.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
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
        {canUpdate && member.role !== Role.OWNER && (
          <ConfirmationDialog
            desc={t("delete-member-desc")}
            onConfirm={() =>
              deleteMember({ id: member.id, resourceType, resourceId })
            }
            disabled={isDeleting}
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

export default Members;
