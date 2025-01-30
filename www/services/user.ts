import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProfile = async (data: Record<string, unknown>) => {
  await api.put("/user", data);
};

const updatePassword = async (data: Record<string, unknown>) => {
  await api.put("/user/password", data);
};

const updateProfileAvatar = async ({ avatar }: { avatar: File | "unset" }) => {
  await api.post(
    "/user/avatar",
    { avatar },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

/**
 * ==========================================
 * ========= MUTATIONS ======================
 * ==========================================
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    updateProfile: mutate,
    isLoading: isPending,
  };
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    updatePassword: mutate,
    isLoading: isPending,
  };
};

export const useUpdateProfileAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateProfileAvatar,
    onSuccess() {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    updateProfileAvatar: mutate,
    isLoading: isPending,
    variables,
  };
};
