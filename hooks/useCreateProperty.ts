import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/services/property.service";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const t3 = useTranslations("toast");

  return useMutation({
    mutationFn: (formData: FormData) => propertyService.create(formData),
    onSuccess: () => {
      toast.success(t3("propertyCreated"));
      queryClient.invalidateQueries({
        queryKey: ["my-properties"],
      });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Failed to create property");
    },
    onSettled: () => {
      console.log("Mutation success!");
    },
  });
};
