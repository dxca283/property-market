import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getUserProperties } from "@/server-actions/getUserProperties";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const PropertiesPage = () => {
  const t = useTranslations('navbar');
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">{t('properties')}</h2>
        </div>
        <Suspense fallback={<CardSkeleton />  }>
          <PropertyContent />
        </Suspense>
      </div>
    </FrontEndLayout>
  );
};
const PropertyContent = async () => {
  const properties = await getUserProperties();
  const t = await getTranslations("property");
  if (properties?.length === 0) {
    return <EmptyState title={t("noProperties")} subtitle={t("noPropertiesSubtitle")}/>
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties?.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default PropertiesPage;
