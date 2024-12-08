import RegisterForm from "@/components/auth/register-form";
import { AuthLayout, GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

const Register: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <RegisterForm />

      {/* ======= SEO START ======= */}
      <NextSeo title={t("create-an-account")} />
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

Register.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"create-an-account"}
        description={"start-free-trial"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default Register;
