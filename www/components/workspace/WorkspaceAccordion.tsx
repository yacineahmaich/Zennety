import { useCan } from "@/hooks/useCan";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Visibility } from "@/types/enums";
import {
  Globe2Icon,
  KanbanSquareIcon,
  LockIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { buttonVariants } from "../ui/button";

const WorkspaceAccordion = ({
  workspace,
}: {
  workspace?: App.Models.Workspace;
}) => {
  const { t } = useTranslation("common");
  const canViewSettings = useCan("update", "workspace", workspace?.id);

  if (!workspace) return null;

  return (
    <AccordionItem value={workspace.id.toString()}>
      <AccordionTrigger className="rounded p-2 hover:bg-accent hover:no-underline">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-accent shadow-xl">
            <img
              src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
              alt={workspace.name}
              className="h-full w-full rounded-[inherit]"
            />
          </div>
          <div className="text-xs">
            <h2>{workspace?.name}</h2>
            <p className="flex items-center gap-1 text-muted-foreground">
              {workspace.visibility === Visibility.PRIVATE && (
                <LockIcon size={14} />
              )}
              {workspace.visibility === Visibility.PUBLIC && (
                <Globe2Icon size={14} />
              )}
              <span>{workspace.visibility}</span>
            </p>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className={cn("mt-2 text-muted-foreground")}>
        <Link
          href={route("workspace", workspace.id)}
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            "w-full justify-start"
          )}
        >
          <KanbanSquareIcon size={16} className="mr-2" />
          {t("boards")}
        </Link>
        <Link
          href={route("workspace/members", workspace.id)}
          className={cn(
            buttonVariants({ size: "sm", variant: "ghost" }),
            "w-full justify-start"
          )}
        >
          <UserIcon size={16} className="mr-2" />
          {t("members")}
        </Link>
        {canViewSettings && (
          <Link
            href=""
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-full justify-start"
            )}
          >
            <SettingsIcon size={16} className="mr-2" /> {t("settings")}
          </Link>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkspaceAccordion;
