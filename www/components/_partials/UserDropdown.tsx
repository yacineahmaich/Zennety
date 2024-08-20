import { useLogout, useUser } from "@/services";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserDropdown = () => {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto select-none overflow-hidden p-2"
        >
          <div className="mt-auto flex items-center gap-4 py-2">
            <div className="h-8 w-8 rounded  bg-accent shadow-xl">
              <img
                // src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-[inherit] object-cover"
              />
            </div>
            <div className="line-clamp-1 flex flex-col items-start">
              <span>{user?.name}</span>
              <small className="text-xs">{user?.email}</small>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-w-full">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <UserIcon size={20} className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/app/profile" className="cursor-pointer">
              <SettingsIcon size={20} className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="mt-4" asChild>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
