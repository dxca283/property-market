import { useQuery } from "@tanstack/react-query";
import { propertyService } from "@/services/property.service";

export const useUserProperties = () => {
  return useQuery({
    queryKey: ["my-properties"] as const,
    queryFn: () => propertyService.getMyProperties(),
    staleTime: 60*1000
  });
};