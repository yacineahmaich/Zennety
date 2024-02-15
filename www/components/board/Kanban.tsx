import { useStatuses } from "@/services";
import { useRouter } from "next/router";
import CreateStatus from "./status/CreateStatus";
import StatusColumn from "./status/StatusColumn";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  const router = useRouter();
  const { workspaceId, boardId } = router.query as {
    workspaceId: string;
    boardId: string;
  };
  const { statuses } = useStatuses(workspaceId, boardId);

  return (
    <main className="flex-1 overflow-x-auto p-3">
      <div className="flex h-full items-start gap-4">
        {(statuses || []).length > 0 && (
          <>
            {statuses?.map((status) => (
              <StatusColumn key={status.id} status={status} />
            ))}
            <CreateStatus board={board} />
          </>
        )}
      </div>
    </main>
  );
};

export default Kanban;
