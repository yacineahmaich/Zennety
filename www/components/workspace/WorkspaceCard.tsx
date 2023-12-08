import { Globe2Icon, LockIcon, StarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

type Props = {
  workspace: App.Models.Workspace;
};

const WorkspaceCard = ({ workspace }: Props) => {
  return (
    <Card className="p-4 ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2">
      <header className="flex items-center justify-between">
        <Link href={`/app/w/${workspace.id}`}>
          <h3 className="text-sm font-bold text-muted-foreground hover:underline">
            {workspace.name}
          </h3>
        </Link>
        <Badge variant="secondary" className="space-x-1 text-muted-foreground">
          {workspace?.visibility === "Private" && <LockIcon size={14} />}
          {workspace?.visibility === "Public" && <Globe2Icon size={14} />}
          <span>{workspace.visibility}</span>
        </Badge>
      </header>
      <div className="my-4">
        <p className="line-clamp-2 max-w-[80%] break-all text-xs text-muted-foreground">
          {workspace.description}
        </p>
      </div>
      <footer className="flex items-center justify-between">
        <div className="flex items-center divide-x">
          <div className="flex items-center pr-2 text-xs text-muted-foreground">
            <UserIcon size={14} />
            <span className="">{workspace.members?.length}</span>
          </div>
          <p className="pl-2 text-xs text-muted-foreground">
            Updated 2 hours ago
          </p>
        </div>
        <button>
          <StarIcon size={16} className="text-muted-foreground" />
        </button>
      </footer>
    </Card>
  );
};

export default WorkspaceCard;
