import { api, csrf } from "@/lib/api";
import { route } from "@/lib/routes";
import { UserLogin } from "@/pages/auth/login";
import { UserRegister } from "@/pages/auth/register";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const register = async (data: UserRegister): Promise<App.Models.User> => {
  await csrf();
  const response = await api.post("/register", data);

  return response.data;
};

const login = async (data: UserLogin): Promise<App.Models.User> => {
  await csrf();
  const response = await api.post("/login", data);

  return response.data;
};

const logout = async () => {
  await api.post("/logout");
};

const getUser = async (): Promise<App.Models.User> => {
  const response = await api.get("/user");
  return response.data;
};

const resendVerificationEmail = async () => {
  await api.post("/email/verification-notification");
};

const sendResetPasswordEmail = async ({ email }: { email: string }) => {
  await api.post("/forgot-password", { email });
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */
export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    user: data!,
    isLoading,
  };
};

/**
 * ==========================================
 * ========= MUTATIONS ========================
 * ==========================================
 */
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess(user) {
      queryClient.setQueryData(["user"], user);
      router.replace(route("app"));
    },
  });

  return {
    register: mutate,
    isLoading: isPending,
  };
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess(user) {
      queryClient.setQueryData(["user"], user);
      router.replace((router.query.callback as string) || route("app"));
    },
  });

  return {
    login: mutate,
    isLoading: isPending,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.setQueryData(["user"], null);
      router.replace(route("login"));
    },
  });

  return {
    logout: mutate,
    isLoading: isPending,
  };
};

export const useResendVerificationEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: resendVerificationEmail,
  });

  return {
    resendVerificationEmail: mutate,
    isLoading: isPending,
  };
};

export const useSendResetPasswordEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendResetPasswordEmail,
  });

  return {
    sendResetPasswordEmail: mutate,
    isLoading: isPending,
  };
};
