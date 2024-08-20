import {
  useDeleteProfileAvatar,
  useSetProfileAvatar,
  useUser,
} from "@/services";
import { useTranslation } from "next-i18next";
import { Button } from "../ui/button";

const UpdateProfilePicture = () => {
  const { t } = useTranslation("common");
  const { user } = useUser();

  const { setProfileAvatar } = useSetProfileAvatar();
  const { deleteProfileAvatar } = useDeleteProfileAvatar();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-semibold">{t("profile-picture")}</h2>
      </div>
      <div className="h-24 w-24 rounded-full bg-accent shadow-xl">
        <img
          // src="https://trello-logos.s3.amazonaws.com/a3d46149564db08bb5164625ab2244ca/170.png"
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
            setProfileAvatar({
              avatar,
            });
          }
        }}
      />
      <div className="flex items-center">
        <Button size="sm" variant="link">
          <label htmlFor="profile-avatar">{t("upload-photo")}</label>
        </Button>
        <Button size="sm" variant="link" onClick={() => deleteProfileAvatar()}>
          {t("remove-photo")}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
