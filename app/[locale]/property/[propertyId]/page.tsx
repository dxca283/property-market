import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import EmailForm from "@/components/properties/EmailForm";
import PropertyPageSkeleton from "@/components/skeletons/PropertyPageSkeleton";
import { getProperty } from "@/server-actions/getProperty";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

export const formatPrice = (price: number | string) => {
  return Number(price).toLocaleString();
};

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const propertyId = (await params).propertyId;
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <Suspense fallback={<PropertyPageSkeleton />}>
        <PropertyContent propertyId={propertyId} />
      </Suspense>
    </FrontEndLayout>
  );
};

const PropertyContent = async ({ propertyId }: { propertyId: string }) => {
  const t = await getTranslations("property");
  const property = await getProperty(propertyId);
  return (
    <section className="py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25] text-primary">
              {property?.listingType === "sale" ? t("forSale") : t("forRent")}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
              {property?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <FaMapMarkerAlt size={16} className="text-neutral-400" />
                <span className="text-neutral-800 font-medium">
                  {property?.location}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <FaRulerCombined size={16} className="text-neutral-400" />
                <span className="text-neutral-800 font-medium">
                  {property?.area} {t("sqft")}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <LuBedDouble size={16} className="text-neutral-400" />
                <span className="text-neutral-800 font-medium">
                  {property?.bedrooms} {t("rooms")}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <LuBath size={16} className="text-neutral-400" />
                <span className="text-neutral-800 font-medium">
                  {property?.bathrooms} {t("rooms")}
                </span>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
            <p className="text-sm text-text">{t("propertyPrice")}</p>
            <h2 className="mt-2 text-4xl font-bold text-primary">
              ${formatPrice(property?.price || "")}
            </h2>
          </div>
        </div>
        <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
          <Image
            fill
            src={property?.image || ""}
            alt="property"
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* left */}
          <div className="lg:col-span-2">
            <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-text">
                {t("aboutProperty")}
              </h2>
              <p className="mt-6 leading-relaxed text-neutral-700">
                {property?.description}
              </p>
            </div>
          </div>
          {/* right */}
          {property?.owner && (
            <EmailForm
              propertyTitle={property.title}
              propertyPrice={property.price}
              name={property.owner?.name}
              email={property.owner?.email}
              image={property.owner?.image || "/images/avatar.png"}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyPage;
