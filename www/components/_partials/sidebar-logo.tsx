import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarLogo = ({ collapsed, toggleCollapsed }: Props) => {
  const toggleLabel = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <div
      className={cn(
        "flex items-center py-4",
        collapsed
          ? "-mx-1 h-12 justify-center px-1"
          : "-mx-4 h-20 justify-between px-4"
      )}
    >
      {!collapsed && (
        <Link href={route("app")}>
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </Link>
      )}
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="aspect-square"
            onClick={toggleCollapsed}
            aria-label={toggleLabel}
          >
            {collapsed ? (
              <SidebarOpenIcon size={16} />
            ) : (
              <SidebarCloseIcon size={16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={collapsed ? "right" : "bottom"}>
          {toggleLabel}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SidebarLogo;
