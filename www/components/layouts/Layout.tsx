import { isMatch } from "micromatch";
import { Inter as FontSans } from "next/font/google";

import { useUser } from "@/services";
import { useRouter } from "next/router";
import Logo from "../shared/Logo";

export const fontSans = FontSans({
  subsets: ["latin"],
});

const unauthenticatedRoutes = ["/auth/**", "/"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  // Protect routes
  if (!isLoading) {
    if (!isMatch(router.asPath, unauthenticatedRoutes)) {
      if (!user?.id) {
        router.replace(`/auth/login?callback=${router.asPath}`);
        return null;
      }
    }

    // Prevent authenticated users from visiting auth pages
    if (user?.id && isMatch(router.asPath, ["/auth/**"])) {
      router.replace("/app");
      return null;
    }
  }

  return (
    <div className={fontSans.className}>
      {isLoading ? (
        <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-background">
          <Logo width={50} height={50} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Layout;
