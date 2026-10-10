import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../services/wishlist.service";
import { Property } from "@/types/property";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  

  return useMutation({
    mutationFn: (propertyId: string) => wishlistService.toggle(propertyId),

    onMutate: async (propertyId) => {
      // 1. Cancel bất kỳ refetch nào đang diễn ra để tránh ghi đè optimistic update
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      // 2. Snapshot giá trị cũ để rollback khi lỗi
      const previousWishlist = queryClient.getQueryData<Property[]>(["wishlist"]);

      // 3. Thực hiện Optimistic Update trực tiếp vào cache
      queryClient.setQueryData<Property[]>(["wishlist"], (old = []) => {
        const exists = old.some((p) => p.id === propertyId);
        if (exists) {
          return old.filter((p) => p.id !== propertyId);
        } else {
          // Lưu ý: Optimistic property chỉ cần có ID để UI pass check `p.id === propertyId`
          // Các field khác sẽ được update chuẩn xác khi API thực sự refetch
          return [...old, { id: propertyId } as Property];
        }
      });

      return { previousWishlist };
    },

    onError: (err, propertyId, context) => {
      // Rollback lại cache cũ nếu API lỗi
      if (context) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist ?? []);
      }
    },

    onSettled: () => {
      // Sync lại cache với server sau khi mutation xong (thành công/lỗi)
      // Dùng invalidateQueries để đảm bảo data luôn nhất quán với DB
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};