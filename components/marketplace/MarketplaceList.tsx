"use client";

import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "../properties/PropertyCard";
import EmptyState from "../ui/EmptyState";
import { useTranslations } from "next-intl";
import { GetPropertiesParams } from "@/types/property";
import { useEffect, useRef } from "react";
import { Loader2, Plus } from "lucide-react";

interface MarketplaceListProps {
  searchParams: GetPropertiesParams;
  initialData: any;
}

export default function MarketplaceList({ searchParams, initialData }: MarketplaceListProps) {
  const t = useTranslations("property");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProperties(searchParams, initialData);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const properties =
    data?.pages.flatMap((page) => page.items) ?? [];

  if (properties.length === 0) {
    return (
      <EmptyState
        title={t("noProperties")}
        subtitle={t("noPropertiesSubtitle")}
        filter
      />
    );
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-12">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center mt-8 mb-12 h-12 w-full shrink-0">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex items-center justify-center text-muted-foreground/50 rounded-full h-10 w-10 border border-dashed border-muted-foreground/30">
              <Plus className="h-5 w-5" />
            </div>
          )}
        </div>
      )}
    </>
  );
}