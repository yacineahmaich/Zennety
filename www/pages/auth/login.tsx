import LoginForm from "@/components/auth/login-form";
import { AuthLayout, GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <LoginForm />

      {/* ======= SEO START ======= */}
      <NextSeo title={t("login-to-your-account")} />
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

Login.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout
        heading={"welcome-back"}
        description={"login-to-your-account"}
      >
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default Login;
