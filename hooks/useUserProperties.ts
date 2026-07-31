import { useQuery } from "@tanstack/react-query";
import { PropertyStatus } from "@/app/generated/prisma/enums";
import { propertyApi } from "@/api-client/property.api";

export const useUserProperties = (status?: PropertyStatus) => {
  return useQuery({
    queryKey: ["my-properties", status] as const,
    queryFn: () => propertyApi.getMyProperties(status),
    staleTime: 60 * 1000,
  });
};
