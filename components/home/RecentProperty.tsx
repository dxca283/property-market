import { getRecentProperties } from "@/server-actions/getRecentProperties";
import PropertyCard from "../properties/PropertyCard";
import { Suspense } from "react";
import CardSkeleton from "../skeletons/CardSkeleton";

const RecentProperty = async () => {
  const properties = await getRecentProperties();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/*Header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            New Listings
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl ">
            Discover Recently Added Properties
          </h2>
          <p className="mt-5 text-md leading-relaxed text-text/60">
            Browse our latest collection of featured properties, carefully
            selected for their quality, location, and investment potential. From
            modern city apartments to serene countryside homes, your dream
            property awaits.
          </p>
        </div>

        {/* property card */}
        <Suspense fallback={<CardSkeleton />}>
          <RecentPropertyContent />
        </Suspense>
      </div>
    </section>
  );
};

const RecentPropertyContent = async () => {
  const properties = await getRecentProperties();
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default RecentProperty;
