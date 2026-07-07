"use client";

import { useWishlist } from "@/hooks/useWishList";
import { useTranslations } from "next-intl";
import CardSkeleton from "../skeletons/CardSkeleton";
import EmptyState from "../ui/EmptyState";
import PropertyCard from "./PropertyCard";

const WishList = () => {
  const t = useTranslations("property");
  const { data: wishlist, isLoading, isError } = useWishlist();
  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (!wishlist?.length) {
    return (
      <EmptyState
        title={t("noProperties")}
        subtitle={t("noPropertiesSubtitle")}
      />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {wishlist.map((item) => (
        <PropertyCard key={item.id} property={item} />
      ))}
    </div>
  );
};

export default WishList;
