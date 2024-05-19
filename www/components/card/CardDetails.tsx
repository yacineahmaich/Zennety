import {
  CalendarSearchIcon,
  FolderOpenIcon,
  MessageCircleWarningIcon,
  MessageSquareTextIcon,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import RichTextEditor from "../shared/RichTextEditor";
import { Button } from "../ui/button";

const CardDetails = ({ card }: { card: App.Models.Card }) => {
  const { t } = useTranslation("common");

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "<strong>Yacine</strong><br/><i>here is some description</i>"
  );

  return (
    <div className="grid grid-cols-5 divide-x">
      <div className="col-span-3 divide-y pr-5">
        <div className="flex gap-2 py-5">
          <FolderOpenIcon size={20} className="flex-shrink-0" />
          <h2 className="-translate-y-2 break-all text-2xl font-medium">
            {card.name}
          </h2>
        </div>
        <div className="group space-y-4 py-5">
          <div className="relative">
            <div className="flex items-center gap-2">
              <MessageCircleWarningIcon size={20} className="flex-shrink-0" />
              <h2 className="break-all">Description</h2>
            </div>
            {!isEditing && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute right-0 top-0 hidden group-hover:block"
                onClick={() => setIsEditing(true)}
              >
                {t("edit")}
              </Button>
            )}
          </div>
          {isEditing ? (
            <RichTextEditor
              content={description}
              onContentChange={(content) => setDescription(content)}
              placeholder="Write a description here."
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
          {isEditing && (
            <div className="space-x-2">
              <Button size="sm" onClick={() => setIsEditing(false)}>
                Save
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4 py-5">
          <div className="flex items-center gap-2">
            <MessageSquareTextIcon size={20} className="flex-shrink-0" />
            <h2 className="break-all">Comments</h2>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="space-y-2 rounded-lg bg-accent px-5 py-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <h6>yacine</h6>
                </div>
                <p>Cant go a day without coding. ❤️🟡</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pl-5">
        <div className="flex items-center gap-2">
          <CalendarSearchIcon size={18} className="flex-shrink-0" />
          <h2 className="break-all">{t("activity")}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
