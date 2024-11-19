import PinButton from "@/components/shared/pin-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IBoard } from "@/types/models";
import { Globe2Icon, LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { route } from "www/lib/routes";
import { Visibility } from "www/types/enums";

type Props = {
  board: IBoard;
};

const BoardCard = ({ board }: Props) => {
  return (
    <Card className="group flex h-card flex-col overflow-hidden p-4 ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2">
      <header className="flex items-center justify-between">
        <Link href={route("board", board.workspaceId, board.id)}>
          <h3 className="text-sm font-bold  hover:underline">{board.name}</h3>
        </Link>
        <Badge variant="secondary" className="space-x-1 ">
          {board.visibility === Visibility.PRIVATE && <LockIcon size={14} />}
          {board.visibility === Visibility.PUBLIC && <Globe2Icon size={14} />}
          <span>{board.visibility}</span>
        </Badge>
      </header>
      <div className="flex flex-1 items-center">
        <p className="line-clamp-2 max-w-[80%] break-all text-xs text-muted-foreground">
          {board.description}
        </p>
      </div>
      <footer className="mt-auto flex items-center justify-between">
        <div className="flex items-center divide-x">
          <div className="flex items-center pr-2 text-xs text-muted-foreground">
            <UserIcon size={14} />
            <span>{board.members?.length}</span>
          </div>
          <p className="pl-2 text-xs text-muted-foreground">
            Updated 2 hours ago
          </p>
        </div>
        <PinButton
          resourceType="board"
          resourceId={board.id}
          pinned={board.pinned}
        />
      </footer>
    </Card>
  );
};

export default BoardCard;
