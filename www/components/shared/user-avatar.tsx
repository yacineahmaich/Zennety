import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/models";

const UserAvatar = ({
  user,
  showCard = true,
  className,
}: {
  user: IUser;
  showCard?: boolean;
  className?: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className={cn("h-8 w-8", className)}>
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            className="h-full w-full rounded-[inherit] object-cover"
          />
          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      {showCard && (
        <HoverCardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 shadow-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h6 className="text-sm font-semibold">{user.name}</h6>
              <span className="text-xs font-medium text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          {user.bio && (
            <div>
              <p className="text-xs">{user.bio}</p>
            </div>
          )}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default UserAvatar;
