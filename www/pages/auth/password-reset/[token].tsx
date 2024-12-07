import { AuthLayout, GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import { NextSeo } from "next-seo";

const ResetPassword: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <ResetPasswordForm />

      {/* ======= SEO START ======= */}
      <NextSeo title={t("reset-password")} />
      {/* ======= END START ======= */}
    </>
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

ResetPassword.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"reset-password"}
        description={"reset-password-message"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default ResetPassword;
