import { useQuery } from "@tanstack/react-query";
import { wishlistService } from "@/services/wishlist.service";
import { Property } from "@/types/property";

export const useWishlist = () => {
  return useQuery<Property[]>({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
    staleTime: 1000 * 60 * 5, // 5 phút,
    retry: false,
  });
};
