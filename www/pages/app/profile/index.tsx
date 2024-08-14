import { AppLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProfilePage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-semibold">Profile / Yacine Ahmaich</h1>
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
