import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import FilterButton from "@/components/marketplace/FilterButton";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import { properties } from "@/contants/dummyProperties";

const Marketplace = () => {
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
          <FilterButton />
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </FrontEndLayout>
  );
};

export default Marketplace;
