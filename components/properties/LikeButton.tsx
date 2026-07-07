import clsx from "clsx";
import { Heart } from "lucide-react";
import { Property } from "@/types/property";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useQueryClient } from "@tanstack/react-query";
import { useWishlist } from "@/hooks/useWishList";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface LikeButtonProps {
  property: Property;
}

const LikeButton = ({ property }: LikeButtonProps) => {
  const { data: wishlist = [] } = useWishlist();
  const { data: session } = authClient.useSession();
  const isWishlisted = wishlist.some((p) => p.id === property.id);

  const { mutate: toggleLike, isPending } = useToggleLike();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      toast.error("You must log in first");
      return;
    }
    if (isPending) return;
    toggleLike(property.id);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition hover:scale-110 active:scale-90"
      disabled={isPending}
    >
      <Heart
        className={clsx(
          "h-5 w-5 transition-colors",
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-white/80 hover:text-red-400",
        )}
      />
    </button>
  );
};

export default LikeButton;
