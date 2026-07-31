import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approvePropertyAction,
  rejectPropertyAction,
} from "@/server-actions/admin/property.actions";

export const useApproveProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => approvePropertyAction(propertyId),

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
    }) => rejectPropertyAction(propertyId, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },
  });
};
