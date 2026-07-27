import { useQuery } from "@tanstack/react-query";
import { PropertyStatus } from "@/app/generated/prisma/enums";
import { propertyService } from "@/services/property.service";

export const useAdminProperties = (status?: PropertyStatus) => {
    return useQuery({
        queryKey: ["admin-properties", status] as const,
        queryFn: () => propertyService.getAdminProperties(status),
        staleTime: 60 * 1000
    });
};