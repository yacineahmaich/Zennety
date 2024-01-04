import app from "@/lib/app";
import { route } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ChevronLeftSquareIcon, ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const SidebarLogo = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
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
            <img src={app.logoUrl} alt={app.name} className="h-10" />
            <span className="text-xl font-bold">{app.name}</span>
          </div>
        </Link>
      )}
      <Button size="icon" variant="link" onClick={toggleCollapsed}>
        {collapsed ? <ChevronRightSquareIcon /> : <ChevronLeftSquareIcon />}
      </Button>
    </div>
  );
};

export default SidebarLogo;
