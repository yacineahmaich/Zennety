import { MessageSquareWarningIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex w-fit flex-col items-center gap-2 pt-10">
          <MessageSquareWarningIcon />
          <h2 className="text-xl font-semibold">Oops Something went wrong!</h2>
          <Button size="sm" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
