import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import FilterButton from "@/components/marketplace/FilterButton";
import MarketPlace from "@/components/marketplace/Marketplace";
import Navbar from "@/components/navbar/Navbar";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Suspense } from "react";

type MarketplaceProps = {
  searchParams: Promise<{
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  }>;
};

const Marketplace = async ({ searchParams }: MarketplaceProps) => {
  const params = await searchParams;
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
          <FilterButton />
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <MarketPlace searchParams={params} />
        </Suspense>
      </div>
    </FrontEndLayout>
  );
};

export default Marketplace;
