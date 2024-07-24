import Loader from "@/components/shared/Loader";
import { useCard } from "@/services/card";
import CardActivity from "./CardActivity";
import CardComments from "./CardComments";
import CardDescription from "./CardDescription";
import CardTitle from "./CardTitle";

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
    <div className="grid grid-cols-5 divide-x">
      <div className="col-span-3 divide-y pr-5">
        <div className="space-y-6 pb-5">
          <CardTitle board={board} status={status} card={card} />
          <CardDescription board={board} status={status} card={card} />
        </div>
        <div>
          <CardComments board={board} status={status} card={card} />
        </div>
      </div>
      <div className="col-span-2 pl-5">
        <CardActivity card={card} />
      </div>
    </div>
  );
};

export default CardDetails;
