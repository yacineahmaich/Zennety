import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProfile = async (data: Record<string, unknown>) => {
  await api.put("/user", data);
};

const updatePassword = async (data: Record<string, unknown>) => {
  await api.put("/user/password", data);
};

const setProfileAvatar = async ({ avatar }: { avatar: File }) => {
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

const deleteProfileAvatar = async () => {
  await api.delete("/user/avatar");
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

export const useSetProfileAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: setProfileAvatar,
    onSuccess() {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    setProfileAvatar: mutate,
    isLoading: isPending,
    variables,
  };
};

export const useDeleteProfileAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: deleteProfileAvatar,
    onSuccess() {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    deleteProfileAvatar: mutate,
    isLoading: isPending,
    variables,
  };
};
