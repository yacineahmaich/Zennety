import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import Logo from "../shared/logo";

type Props = {
  heading: string;
  description: string;
};

const AuthLayout = ({
  children,
  heading,
  description,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center gap-2 py-28">
      <div>
        <Logo variant="small" className="mx-auto" height={60} width={60} />
        {heading && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary dark:text-white">
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
