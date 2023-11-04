import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { isMatch } from "micromatch";

import { useUser } from "@/services";
import { useRouter } from "next/router";
import app from "@/lib/app";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const unauthenticatedRoutes = ["/auth/**", "/"];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={app.logoUrl} alt={app.name} className="h-12" />
      </div>
    );
  }

  // Protect routes
  if (!isMatch(router.asPath, unauthenticatedRoutes)) {
    if (!user) {
      router.push("/auth/login");
      return null;
    }
  }

  // Prevent authenticated users from visiting auth pages
  if (user && isMatch(router.asPath, ["/auth/**"])) {
    router.push("/app");
    return null;
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}
    >
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {children}
    </div>
  );
};

export default Layout;
