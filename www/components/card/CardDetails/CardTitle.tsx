import { useUpdateCard } from "@/services/card";
import { FolderOpenIcon } from "lucide-react";
import { useState } from "react";

const CardTitle = ({
  board,
  status,
  card,
}: {
  board: App.Models.Board;
  status: App.Models.Status;
  card: App.Models.Card;
}) => {
  const [name, setName] = useState(card.name);
  const [editingName, setEditingName] = useState(false);

  const { updateCard, isLoading } = useUpdateCard();

  return (
    <div className="flex gap-2 py-5">
      <FolderOpenIcon size={20} className="flex-shrink-0" />
      {editingName ? (
        <input
          className="m-0 !min-w-0 !max-w-fit bg-transparent p-0 text-sm font-semibold uppercase"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onBlur={() => {
            setEditingName(false);
            if (name === status.name) return;
            if (name === "") {
              setName(status.name);
              return;
            }
            updateCard({
              workspaceId: board.workspaceId,
              boardId: board.id,
              statusId: status.id,
              cardId: card.id,
              name,
            });
          }}
        />
      ) : (
        <h2
          className="-translate-y-2 break-all text-2xl font-medium"
          onClick={() => setEditingName(true)}
        >
          {card.name}
        </h2>
      )}
    </div>
  );
};

export default CardTitle;
