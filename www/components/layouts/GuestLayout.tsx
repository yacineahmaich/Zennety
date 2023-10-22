import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import app from "@/lib/app";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <header className="fixed w-full left-0 top-0 h-20 container flex items-center justify-between py-4">
        <div>
          <span className="text-2xl font-bold">
            <img src={app.logoUrl} alt={app.name} className="h-10" />
          </span>
        </div>

        <div className="space-x-2">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/auth/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </header>
      <div className="min-h-screen pt-20">{children}</div>
    </div>
  );
};

export default GuestLayout;
