import { useQuery } from "@tanstack/react-query";
import { PropertyStatus } from "@/app/generated/prisma/enums";
import { propertyApi } from "@/api-client/property.api";

export const useAdminProperties = (status?: PropertyStatus) => {
  return useQuery({
    queryKey: ["admin-properties", status] as const,
    queryFn: () => propertyApi.getAdminProperties(status),
    staleTime: 60 * 1000,
  });
};
