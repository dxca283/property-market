"use client";
import { Property } from "@/types/property";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useFormatter } from "next-intl";
import LikeButton from "./LikeButton";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const t = useTranslations("property");
  const format = useFormatter();
  return (
    <Link
      href={`/property/${property.id}`}
      className="group relative h-125 overflow-hidden rounded-4xl"
    >
      <div className="w-full h-full relative">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="inset-0 object-cover transition duration-700 group-hover:scale-110"
        />
        {/* wishlist heart */}
        <LikeButton property={property}/>
        {/* dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        {/* top badges */}
        <div className="absolute left-5 top-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary">
          {property.listingType === "rent" ? t("forRent") : t("forSale")}
        </div>
        {/* content card */}
        <div className="absolute bottom-5 left-5 right-5 z-20 rounded-[29px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              {property.listingType === "rent" ? (
                <h3 className="text-3xl font-bold text-white flex items-center">
                  {format.number(property.price)}
                  <span className="text-sm text-white/60">/{t("month")}</span>
                </h3>
              ) : (
                <h3 className="text-3xl font-bold text-white">
                  {format.number(property.price)}
                </h3>
              )}
              <p className="mt-1 text-sm text-white/60">{property.location}</p>
            </div>

            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              {property.propertyType}
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-white">
            {property.title}
          </h2>
          {/* features*/}
          <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {property.bedrooms} {t("beds")}
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {property.bathrooms} {t("bathrooms")}
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {property.area} {t("sqft")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
