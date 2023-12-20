import { MoreHorizontalIcon } from "lucide-react";
import { Card } from "../ui/card";

const StatusHeader = ({ status }: { status: App.Models.Status }) => {
  return (
    <Card className="flex h-fit w-64 shrink-0 items-center justify-between gap-6 bg-primary px-4 py-2 text-background">
      <h4 className="line-clamp-1 break-all text-sm font-semibold uppercase">
        {status.name}
      </h4>
      <button>
        <MoreHorizontalIcon size={16} />
      </button>
    </Card>
  );
};

export default StatusHeader;
