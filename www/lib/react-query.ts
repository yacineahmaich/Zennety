import { ApiError } from "@/types/base";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
        toast.error("Ooops! Something went wrong.", {
          description: errMsg,
        });
      },
    },
  },
});
