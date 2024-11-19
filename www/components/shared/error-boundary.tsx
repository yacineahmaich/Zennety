import { Button } from "@/components/ui/button";
import { RefreshCcwIcon, ServerCrashIcon } from "lucide-react";
import { TFunction, withTranslation } from "next-i18next";
import React from "react";

type Props = {
  t: TFunction;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex w-fit flex-col items-center gap-2 pt-10">
          <ServerCrashIcon size={40} />
          <h2 className="text-xl font-semibold">
            {this.props.t("something-went-wrong")}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCcwIcon size={16} /> {this.props.t("reload")}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => this.setState({ hasError: false })}
            >
              {this.props.t("try-again")}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation("common")(ErrorBoundary);
