import { getRecentProperties } from "@/server-actions/getRecentProperties";
import PropertyCard from "../properties/PropertyCard";
import { Suspense } from "react";
import CardSkeleton from "../skeletons/CardSkeleton";
import { getTranslations } from "next-intl/server";

const RecentProperty = async () => {
  const t = await getTranslations("home");
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/*Header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {t("newListings")}
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl ">
            {t("recentPropertiesTitle")}
          </h2>
          <p className="mt-5 text-md leading-relaxed text-text/60">
            {t("recentPropertiesDescription")}
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
