import app from "@/lib/app";
import { ReactNode } from "react";
import { useTranslation } from "next-i18next";

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
    <div className="flex flex-col items-center gap-2 py-20">
      <div>
        <img
          src={app.logoUrl}
          alt={app.name}
          height={48}
          width={48}
          className="mx-auto"
        />
        {heading && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t(heading)}
          </h2>
        )}
        {description && (
          <p className="mt-2 text-center text-gray-600 dark:text-white">
            {t(description)}
          </p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
