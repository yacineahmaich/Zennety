import { toast } from "@/components/ui/use-toast";
import { QueryClient } from "@tanstack/react-query";
import { getFirstApiErrorMsg } from "./helpers";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NEXT_PUBLIC_ENV === "production",
    },
    mutations: {
      retry: false,
      onError(error: ApiError) {
        const errMsg = getFirstApiErrorMsg(error);
        toast({
          variant: "destructive",
          title: "Ooops! Something went wrong.",
          description: errMsg,
        });
      },
    },
  },
});
