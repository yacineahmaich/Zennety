import CreateCard from "./card/CreateCard";
import CreateStatus from "./status/CreateStatus";
import StatusHeader from "./status/StatusHeader";

const Kanban = ({ board }: { board: App.Models.Board }) => {
  return (
    <main className=" overflow-x-auto p-3">
      <div className="flex items-start gap-4">
        {board?.statuses?.map((status) => (
          <div key={status.id} className="space-y-2">
            <StatusHeader status={status} />
            <CreateCard status={status} />
          </div>
        ))}
        <CreateStatus board={board} />
      </div>
    </main>
  );
};
export default Kanban;
