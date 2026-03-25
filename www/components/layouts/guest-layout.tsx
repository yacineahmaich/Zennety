import ErrorBoundary from "@/components/shared/error-boundary";
import GuestFooter from "@/components/shared/guest-footer";
import Header from "@/components/shared/header";
import { PropsWithChildren } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
      <GuestFooter />
    </div>
  );
};

export default GuestLayout;
