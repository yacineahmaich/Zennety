import { api } from "@/lib/api";
import app from "@/lib/app";
import { route } from "@/lib/routes";
import { UserLogin } from "@/pages/auth/login";
import { ResetPassword } from "@/pages/auth/password-reset/[token]";
import { UserRegister } from "@/pages/auth/register";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const register = async (
  data: UserRegister
): Promise<{
  user: App.Models.User;
  token: string;
}> => {
  const response = await api.post("/register", data);

  return response.data;
};

const login = async (
  data: UserLogin
): Promise<{
  user: App.Models.User;
  token: string;
}> => {
  const response = await api.post("/login", data);

  return response.data;
};

const logout = async () => {
  await api.post("/logout");
};

const getUser = async (): Promise<App.Models.User> => {
  const response = await api.get("/user");
  return response.data.data;
};

const resendVerificationEmail = async () => {
  await api.post("/email/verification-notification");
};

const sendResetPasswordEmail = async ({ email }: { email: string }) => {
  await api.post("/forgot-password", { email });
};

const resetPassword = async (data: ResetPassword) => {
  await api.post("/reset-password", data);
};

/**
 * ==========================================
 * ========= QUERIES ========================
 * ==========================================
 */
export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    retry: false,
    staleTime: Infinity,
    throwOnError: false,
  });

  return {
    user: data!,
    isLoading,
  };
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess({ user, token }) {
      localStorage.setItem(app.tokenName, token);
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

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess({ user, token }) {
      localStorage.setItem(app.tokenName, token);
      window.location.replace(
        (router.query.callback as string) || route("app")
      );
    },
  });

  return {
    login: mutate,
    isLoading: isPending,
  };
};

export const useLogout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess() {
      localStorage.removeItem(app.tokenName);
      window.location.replace(route("login"));
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

export const useResetPassword = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess(_, { email }) {
      window.location.replace(
        (router.query.callback as string) || route("login", `&email=${email}`)
      );
    },
  });

  return {
    resetPassword: mutate,
    isLoading: isPending,
  };
};
