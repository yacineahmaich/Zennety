import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarLogo = ({ collapsed, toggleCollapsed }: Props) => {
  return (
    <div
      className={cn(
        "-mx-4 flex h-20 items-center justify-between px-4 py-4",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && (
        <Link href={route("app")}>
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </Link>
      )}
      <Button
        size="icon"
        variant="secondary"
        className="aspect-square"
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <SidebarOpenIcon size={16} />
        ) : (
          <SidebarCloseIcon size={16} />
        )}
      </Button>
    </div>
  );
};

export default SidebarLogo;
