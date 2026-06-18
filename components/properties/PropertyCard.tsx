import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
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
      </div>
    </Link>
  );
};

export default PropertyCard;
