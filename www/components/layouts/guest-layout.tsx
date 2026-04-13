import ErrorBoundary from "@/components/shared/error-boundary";
import GuestFooter from "@/components/shared/guest-footer";
import Header from "@/components/shared/header";
import { PropsWithChildren } from "react";
import LandingCta from "../landing/landing-cta";

const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mb-20 flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
      <LandingCta />
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
