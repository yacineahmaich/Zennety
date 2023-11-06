import { api, csrf } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// =============================================
// ========= AUTHENTICATION ====================
// =============================================
const register = async (data: UserRegister) => {
  await csrf();
  await api.post("/register", data);

  window.location.pathname = "/app";
};

const login = async (data: UserLogin) => {
  await csrf();
  await api.post("/login", data);

  window.location.pathname = "/app";
};

const logout = async () => {
  await api.post("/logout");

  window.location.pathname = "/auth/login";
};

const getUser = async (): Promise<App.Models.User> => {
  const response = await api.get("/api/user");
  return response.data;
};

// mutations
const useRegister = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: register,
  });

  return {
    register: mutate,
    isLoading: isPending,
  };
};

const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: login,
  });

  return {
    login: mutate,
    isLoading: isPending,
  };
};

const useLogout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
  });

  return {
    logout: mutate,
    isLoading: isPending,
  };
};

// queries
const useUser = () => {
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
    user: data,
    isLoading,
  };
};

export { useRegister, useLogin, useLogout, useUser, getUser };
