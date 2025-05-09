import Loader from "@/components/shared/loader";
import { useCard } from "@/services/card";
import { IBoard, IStatus } from "@/types/models";
import CardActivity from "./card-activity";
import CardDescription from "./card-description";
import CardOptions from "./card-options";
import CardTitle from "./card-title";
import CreateComment from "./create-comment";

type Props = {
  board: IBoard;
  status: IStatus;
  cardId: number;
};

const CardDetails = ({ board, status, cardId }: Props) => {
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
      <div className="col-span-full divide-y overflow-y-scroll md:col-span-4">
        <div className="p-5">
          <CardTitle board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <CardDescription board={board} status={status} card={card} />
        </div>
        <div className="p-5">
          <CardOptions board={board} status={status} card={card} />
        </div>
        <div className="p-5"></div>
      </div>
      <div className="col-span-full flex h-full flex-col overflow-hidden p-5 pr-0 md:col-span-2">
        <div className="flex h-full w-full flex-1 flex-col">
          <CardActivity activities={card.activities ?? []} />
          <CreateComment board={board} status={status} card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
