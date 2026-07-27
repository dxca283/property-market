import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveProperty,
  rejectProperty,
} from "@/server-actions/adminPropertyActions";

export const useApproveProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => approveProperty(propertyId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },
  });
};

export const useRejectProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      propertyId,
      reason,
    }: {
      propertyId: string;
      reason: string;
    }) => rejectProperty(propertyId, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },
  });
};
