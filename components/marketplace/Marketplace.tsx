import { getProperties } from "@/services/property.service";
import MarketplaceList from "./MarketplaceList";
import { MarketplaceSearchParams } from "@/types/marketplace";

interface MarketPlaceProps {
  searchParams: MarketplaceSearchParams;
}

const MarketPlace = async ({ searchParams }: MarketPlaceProps) => {
  const initialData = await getProperties({
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
  });

  return (
    <MarketplaceList 
      searchParams={{
        search: searchParams.search,
        address: searchParams.address,
        location: searchParams.location,
        propertyType: searchParams.propertyType,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      }} 
      initialData={initialData} 
    />
  );
};

export default MarketPlace;
