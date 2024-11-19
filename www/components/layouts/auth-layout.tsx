import Logo from "@/components/shared/logo";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

const AuthLayout = ({
  children,
  heading,
  description,
}: {
  children: ReactNode;
  heading: string;
  description: string;
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center gap-2 py-28">
      <div>
        <Logo className="mx-auto" width={60} height={60} />
        {heading && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t(heading)}
          </h2>
        )}
        {description && (
          <p className="mt-2 max-w-xl text-center text-gray-600 dark:text-white">
            {t(description)}
          </p>
        )}
      </div>
      <div className="w-[300px]">{children}</div>
    </div>
  );
};

export default AuthLayout;
