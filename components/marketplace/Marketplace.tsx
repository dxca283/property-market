import { getProperties } from "@/server-actions/getProperties";
import EmptyState from "../ui/EmptyState";
import PropertyCard from "../properties/PropertyCard";

interface MarketPlceProps {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

const MarketPlace = async ({ searchParams }: MarketPlceProps) => {
  const properties: Property[] = await getProperties({
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    maxPrice: searchParams.maxPrice,
    minPrice: searchParams.minPrice,
  });
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Try adjusting your search filters"
        filter
      />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-12">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default MarketPlace;
