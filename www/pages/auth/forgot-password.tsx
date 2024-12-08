import { AuthLayout, GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { NextSeo } from "next-seo";

const ForgotPassword: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <ForgotPasswordForm />

      {/* ======= SEO START ======= */}
      <NextSeo title={t("forgot-password")} />
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

ForgotPassword.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"forgot-password"}
        description={"forgot-password-message"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default ForgotPassword;
