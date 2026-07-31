import { getCachedApprovedProperties, getProperties} from "@/services/property.service";
import MarketplaceList from "./MarketplaceList";
import { MarketplaceSearchParams } from "@/types/marketplace";

interface MarketPlaceProps {
  searchParams: MarketplaceSearchParams;
}

const MarketPlace = async ({ searchParams }: MarketPlaceProps) => {
  const params = {
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    maxPrice: searchParams.maxPrice
      ? Number(searchParams.maxPrice)
      : undefined,
    minPrice: searchParams.minPrice
      ? Number(searchParams.minPrice)
      : undefined,
  };

  const hasFilter =
    !!params.search ||
    !!params.address ||
    !!params.location ||
    !!params.propertyType ||
    params.minPrice !== undefined ||
    params.maxPrice !== undefined;

  const initialData = hasFilter
    ? await getProperties(params)
    : await getCachedApprovedProperties();

  return (
    <MarketplaceList
      searchParams={params}
      initialData={initialData}
    />
  );
};


export default MarketPlace;
