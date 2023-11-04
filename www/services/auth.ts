import { api, csrf } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// =============================================
// ========= AUTHENTICATION ====================
// =============================================
const register = async (data: UserRegister) => {
  await csrf();
  await api.post("/register", data);
};

const login = async (data: UserLogin) => {
  await csrf();
  await api.post("/login", data);
};

const getUser = async (): Promise<App.Models.User> => {
  const response = await api.get("/api/user");
  return response.data;
};

// mutations
const useRegister = () =>
  useMutation({
    mutationFn: register,
  });

const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

// queries
const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export { useRegister, useLogin, useUser };
