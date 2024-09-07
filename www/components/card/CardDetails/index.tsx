import Loader from "@/components/shared/Loader";
import { useCard } from "@/services/card";
import CardActivity from "./CardActivity";
import CardDescription from "./CardDescription";
import CardOptions from "./CardOptions";
import CardTitle from "./CardTitle";
import CreateComment from "./CreateComment";

const CardDetails = ({
  board,
  status,
  cardId,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  cardId: number;
}) => {
  const { card, isLoading } = useCard({
    workspaceId: board.workspaceId,
    boardId: board.id,
    statusId: status.id,
    cardId: cardId,
  });

  if (isLoading)
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );

  if (!card) return null;

  return (
    <div className="grid max-h-full flex-1 grid-cols-6 divide-x overflow-hidden">
      <div className="col-span-4 divide-y overflow-y-scroll">
        <div className="p-5">
          <CardTitle board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <CardDescription board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <CardOptions board={board} status={status} card={card} />
        </div>
        <div className="p-5">HMMM</div>
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden p-5 pr-0">
        <div className="flex h-full w-full flex-1 flex-col">
          <CardActivity activities={card.activities ?? []} />
          <CreateComment board={board} status={status} card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
