import { Button } from "@/components/ui/button";
import { useUpdateProfileAvatar, useUser } from "@/services";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

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
      <div className="h-24 w-24 rounded-full bg-accent shadow-xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full rounded-[inherit] object-cover"
        />
      </div>
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
