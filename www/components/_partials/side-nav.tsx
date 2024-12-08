import { buttonVariants } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { FolderKanbanIcon, WalletCardsIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const SideNav = () => {
  const { t } = useTranslation("common");

  return (
    <nav className="-mx-4 overflow-x-hidden">
      <ul className="space-y-2 border-b border-accent px-1 px-2 pb-2">
        <li>
          <Link
            href={route("app")}
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-full justify-start"
            )}
          >
            <FolderKanbanIcon className="mr-2" /> {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-full justify-start [&[aria-disabled]]:cursor-not-allowed"
            )}
            aria-disabled
          >
            <WalletCardsIcon className="mr-2" /> {t("templates")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
