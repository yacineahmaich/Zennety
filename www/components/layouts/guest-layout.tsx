import ErrorBoundary from "@/components/shared/error-boundary";
import Header from "@/components/shared/header";
import { PropsWithChildren } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div className="container">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
};

export default GuestLayout;
