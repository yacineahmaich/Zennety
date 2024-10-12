import { AppLayout } from "@/components/layouts";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateProfileInfo from "@/components/profile/UpdateProfileInfo";
import UpdateProfilePicture from "@/components/profile/UpdateProfilePicture";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProfilePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col-reverse gap-16 pb-20 md:flex-row">
      <div className="space-y-8 md:max-w-[450px]">
        <UpdateProfileInfo />
        <UpdatePasswordForm />
      </div>
      <div>
        <UpdateProfilePicture />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

ProfilePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ProfilePage;
