import { route } from "@/lib/routes";
import { useUser } from "@/services";
import { IWorkspace } from "@/types/models";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { isMatch } from "micromatch";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type BreadcrumbItem = {
  label: string;
  link?: string;
  links?: Array<{ label: string; link: string }>;
};

const AppBreadcrumb = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [breadcrumbItems, setBreadcrumbItems] = useState<Array<BreadcrumbItem>>(
    []
  );

  /**
   * TODO: this is just a temporary work around, need a better solution
   */
  const [key, setKey] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => setKey(new Date().getSeconds()), 100);

    return () => clearInterval(interval);
  }, []);

  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };

  useEffect(() => {
    const items: Array<BreadcrumbItem> = [];
    // Dashboard
    if (isMatch(router.asPath, route("app") + "/**")) {
      items.push({
        label: isMatch(router.asPath, route("app"))
          ? t("user-welcome-back", { name: user?.name })
          : t("dashboard"),
        link: isMatch(router.asPath, route("app")) ? "" : route("app"),
      });
    }

    // Workspace
    if (isMatch(router.asPath, route("workspace", workspaceId) + "/**")) {
      const workspace = queryClient.getQueryData<IWorkspace>([
        "workspaces",
        workspaceId,
      ]);

      const myWorkspaces = queryClient.getQueryData<Array<IWorkspace>>([
        "my-workspaces",
      ]);

      if (!workspace) return;

      items.push({
        label: workspace.name,
        link: route("workspace", workspaceId),
        links: myWorkspaces?.map((w) => ({
          label: w.name,
          link: route("workspace", w.id),
        })),
      });
    }

    // Board
    if (isMatch(router.asPath, route("board", workspaceId, boardId) + "/**")) {
      const workspace = queryClient.getQueryData<IWorkspace>([
        "workspaces",
        workspaceId,
      ]);
      const board = queryClient.getQueryData<IWorkspace>([
        "workspaces",
        workspaceId,
        "boards",
        boardId,
      ]);
      if (!workspace || !board) return;

      items.push({
        label: board.name,
        link: route("board", workspaceId, boardId),
        links: workspace?.boards?.map((b) => ({
          label: b.name,
          link: route("board", workspace.id, b.id),
        })),
      });
    }

    setBreadcrumbItems(items);

    // @ts-ignore
  }, [workspaceId, boardId, queryClient, router.asPath, t, user?.name, key]);

  if (!breadcrumbItems?.length)
    return (
      <div className="my-5">
        <Breadcrumb className="invisible">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Placeholder</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );

  return (
    <div className=" py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, key) => (
            <BreadcrumbItem key={key}>
              {item?.links?.length ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    {item.label}
                    <ChevronDownIcon size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.links.map((subItem, subItemKey) => (
                      <DropdownMenuItem key={subItemKey} asChild>
                        <Link href={subItem.link}>{subItem.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.link ? (
                <BreadcrumbLink asChild>
                  <Link href={item.link}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
              {breadcrumbItems.length > 1 &&
                key < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
