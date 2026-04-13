import { buttonVariants } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  BookMarkedIcon,
  FolderKanbanIcon,
  WalletCardsIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = { collapsed?: boolean };

const SideNav = ({ collapsed }: Props) => {
  const { t } = useTranslation("common");

  const items = [
    { href: route("app"), Icon: FolderKanbanIcon, label: t("home") },
    { href: route("bookmarks"), Icon: BookMarkedIcon, label: t("bookmarks") },
    {
      href: "#",
      Icon: WalletCardsIcon,
      label: t("templates"),
      disabled: true,
    },
  ];

  return (
    <nav
      className={cn(
        "overflow-x-hidden border-b border-accent py-2",
        collapsed ? "-mx-1 px-0" : "-mx-4 px-2"
      )}
    >
      <ul className="space-y-2">
        {items.map((item) => {
          const link = (
            <Link
              href={item.href}
              aria-label={collapsed ? item.label : undefined}
              aria-disabled={item.disabled}
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                "w-full",
                collapsed ? "justify-center px-0" : "justify-start",
                item.disabled && "[&[aria-disabled]]:cursor-not-allowed"
              )}
            >
              <item.Icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
              {!collapsed && item.label}
            </Link>
          );

          const tooltip = collapsed
            ? item.label
            : item.disabled
            ? t("coming-soon")
            : null;

          if (!tooltip) {
            return <li key={item.href}>{link}</li>;
          }

          return (
            <li key={item.href}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side={collapsed ? "right" : "top"}>
                  {item.disabled && collapsed
                    ? `${item.label} — ${t("coming-soon")}`
                    : tooltip}
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
