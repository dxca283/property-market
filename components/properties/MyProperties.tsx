"use client";

import PropertyCard from "./PropertyCard";
import EmptyState from "../ui/EmptyState";
import CardSkeleton from "../skeletons/CardSkeleton";
import { useUserProperties } from "@/hooks/useUserProperties";
import { useTranslations } from "next-intl";

const MyProperties = () => {
  const t = useTranslations("property");

  const {
    data: properties,
    isLoading,
    isError,
  } = useUserProperties();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (!properties?.length) {
    return (
      <EmptyState
        title={t("noProperties")}
        subtitle={t("noPropertiesSubtitle")}
      />
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default MyProperties;