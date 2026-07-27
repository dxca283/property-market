"use client";

import ManagePropertyCard from "./ManagePropertyCard";
import EmptyState from "../ui/EmptyState";
import CardSkeleton from "../skeletons/CardSkeleton";
import { useUserProperties } from "@/hooks/useUserProperties";
import { useTranslations } from "next-intl";
import { PropertyStatus } from "@/app/generated/prisma/enums";

const MyProperties = ({ status, isAdmin }: { status?: PropertyStatus, isAdmin?: boolean }) => {
  const t = useTranslations("property");

  const {
    data: properties,
    isLoading,
    isError,
  } = useUserProperties(status);

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
    <div className="flex flex-col gap-4 my-4">
      {properties.map((property) => (
        <ManagePropertyCard key={property.id} property={property} status={status} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default MyProperties;