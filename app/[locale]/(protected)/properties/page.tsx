import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import MyProperties from "@/components/properties/MyProperties";
import PropertyCard from "@/components/properties/PropertyCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { propertyService } from "@/services/property.service";
import { Property } from "@/types/property";
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
        <MyProperties />
      </div>
    </FrontEndLayout>
  );
};


export default PropertiesPage;
