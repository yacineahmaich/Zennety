import { useBookmarkItem } from "@/services/common";
import { ResourceType } from "@/types/helpers";
import { BookmarkCheckIcon, BookmarkPlusIcon } from "lucide-react";

type Props = {
  resourceId: number;
  resourceType: ResourceType;
  pinned: boolean;
};

const BookmarkButton = ({ resourceType, resourceId, pinned }: Props) => {
  const { bookmarkItem, isLoading } = useBookmarkItem();

  return (
    <button
      onClick={() => bookmarkItem({ resourceType, resourceId })}
      className="flex items-center justify-center transition-transform active:scale-90"
      disabled={isLoading}
    >
      {pinned ? (
        <BookmarkCheckIcon size={16} className="stroke-yellow-300" />
      ) : (
        <BookmarkPlusIcon size={16} />
      )}
    </button>
  );
};

export default BookmarkButton;
