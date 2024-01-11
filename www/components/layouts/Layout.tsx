import { cn } from "@/lib/utils";
import { isMatch } from "micromatch";
import { Inter as FontSans } from "next/font/google";

import app from "@/lib/app";
import { useUser } from "@/services";
import { useRouter } from "next/router";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const unauthenticatedRoutes = ["/auth/**", "/"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  // Protect routes
  if (!isLoading) {
    if (!isMatch(router.asPath, unauthenticatedRoutes)) {
      if (!user) {
        router.replace(`/auth/login?callback=${router.asPath}`);
        return null;
      }
    }

    // Prevent authenticated users from visiting auth pages
    if (user && isMatch(router.asPath, ["/auth/**"])) {
      router.replace("/app");
      return null;
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      {isLoading && (
        <div className="fixed inset-0 z-[999999999999] flex items-center justify-center bg-background">
          <img src={app.logoUrl} alt={app.name} className="h-12" />
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
