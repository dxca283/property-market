import { useQuery } from "@tanstack/react-query";
import { propertyService } from "@/services/property.service";
import { PropertyStatus } from "@/app/generated/prisma/enums";

export const useUserProperties = (status?: PropertyStatus) => {
  return useQuery({
    queryKey: ["my-properties", status] as const,
    queryFn: () => propertyService.getMyProperties(status),
    staleTime: 60*1000
  });
};