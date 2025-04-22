import { Button } from "@/components/ui/button";
import { useUpdateProfileAvatar, useUser } from "@/services";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UpdateProfilePicture = () => {
  const { t } = useTranslation("common");
  const { user } = useUser();

  const { updateProfileAvatar } = useUpdateProfileAvatar();

  const handleUpdateProfile = (avatar: File | "unset") => {
    updateProfileAvatar(
      {
        avatar,
      },
      {
        onSuccess() {
          toast.success(t("success"), {
            description: t("updated", {
              resource: t("profile-picture"),
            }),
          });
        },
      }
    );
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-semibold">{t("profile-picture")}</h2>
      </div>

      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <input
        id="profile-avatar"
        type="file"
        hidden
        onChange={(e) => {
          const avatar = e.target.files?.[0];
          if (avatar) {
            handleUpdateProfile(avatar);
          }
        }}
      />
      <div className="flex items-center">
        <Button size="sm" variant="link">
          <label htmlFor="profile-avatar">{t("upload-photo")}</label>
        </Button>
        {user.has_avatar && (
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              handleUpdateProfile("unset");
            }}
          >
            {t("remove-photo")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
