import { roles } from "@/lib/constants";
import { Role } from "@/types/enums";
import {
  ListFilterIcon,
  TrashIcon,
  UserCheckIcon,
  UserCogIcon,
  UserIcon,
  UserSearchIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { Avatar, AvatarImage } from "../ui/avatar";
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

const WorkspaceMembers = ({
  workspace,
}: {
  workspace: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="p-8">
      <span className="mb-4 flex items-center">
        <UserIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">
          {t("members")} ({workspace?.members?.length || 0})
        </h2>
      </span>
      <div className="flex gap-8">
        <div className="flex flex-col content-start gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-40 justify-start text-xs"
          >
            <UsersIcon size={14} className="mr-2" /> {t("all")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-40 justify-start text-xs"
          >
            <UserCheckIcon size={14} className="mr-2" /> {t("admin")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-40 justify-start text-xs"
          >
            <UserCheckIcon size={14} className="mr-2" /> {t("member")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-40 justify-start text-xs"
          >
            <UserSearchIcon size={14} className="mr-2" /> {t("viewer")}
          </Button>
        </div>
        <div className="flex-1 rounded-lg">
          <div className="flex justify-between gap-4">
            <Input placeholder="Search by name or email address" />
            <Select defaultValue={workspace.id.toString()}>
              <SelectTrigger className="w-[250px]">
                <div className="flex items-center gap-2">
                  <ListFilterIcon size={16} />
                  <SelectValue placeholder="Filter by board" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={workspace.id.toString()}>
                  <div className="flex items-center gap-1 text-sm">
                    <span>w/{workspace.name}</span>
                  </div>
                </SelectItem>

                {workspace.boards?.map((board) => (
                  <SelectItem key={board.id} value={board.id.toString()}>
                    <div className="flex items-center gap-1 text-sm">
                      <span>{board.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {workspace?.members?.map((member) => (
              <Card
                key={member.id}
                className="flex items-center justify-between gap-2 p-2"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
                      className="h-9 w-9 rounded"
                    />
                  </Avatar>
                  <div className="text-xs">
                    <h2 className="font-semibold">{member.name}</h2>
                    <p>{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Select
                    value={member.role}
                    disabled={member.role === Role.OWNER}
                  >
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {member.role === Role.OWNER && (
                        <SelectItem value={Role.OWNER} disabled>
                          <div className="flex h-4 items-center gap-1 text-xs">
                            <UserCogIcon size={14} /> <span>{Role.OWNER}</span>
                          </div>
                        </SelectItem>
                      )}
                      {roles
                        .filter((r) => r !== Role.OWNER)
                        .map((role) => (
                          <SelectItem key={role} value={role}>
                            <div className="flex h-4 items-center gap-1 text-xs">
                              <UserCogIcon size={14} /> <span>{role}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="destructive" className="h-6 p-2">
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceMembers;
