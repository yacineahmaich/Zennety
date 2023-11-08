import { AuthLayout, GuestLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { useLogout, useResendVerificationEmail } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { ArrowRightLeftIcon, SendIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const VerifyEmail: NextPageWithLayout = () => {
  const { resendVerificationEmail, isLoading } = useResendVerificationEmail();
  const { logout } = useLogout();
  const { t } = useTranslation("common");

  return (
    <div className="mt-4 flex gap-2">
      <Button
        size="sm"
        onClick={() => resendVerificationEmail()}
        disabled={isLoading}
      >
        <SendIcon size="20" className="mr-2" />
        {t("resend-verification-email")}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="mx-auto w-fit"
        onClick={() => logout()}
      >
        <ArrowRightLeftIcon size="20" className="mr-2" />
        {t("login-with-diffrent-account")}
      </Button>
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

VerifyEmail.getLayout = (page) => {
  return (
    <GuestLayout>
      <AuthLayout heading={"verify-email"} description={"verify-email-message"}>
        {page}
      </AuthLayout>
    </GuestLayout>
  );
};

export default VerifyEmail;
