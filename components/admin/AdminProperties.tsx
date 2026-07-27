"use client";

import EmptyState from "../ui/EmptyState";
import CardSkeleton from "../skeletons/CardSkeleton";
import { PropertyStatus } from "@/app/generated/prisma/enums";
import ManagePropertyCard from "../properties/ManagePropertyCard";
import { useAdminProperties } from "@/hooks/useAdminProperties";


const AdminProperties = ({
  status,
}: {
  status?: PropertyStatus;
}) => {

  const {
    data: properties,
    isLoading,
    isError,
  } = useAdminProperties(status);


  if (isLoading) {
    return <CardSkeleton />;
  }


  if (isError) {
    return <div>Something went wrong.</div>;
  }


  if (!properties?.length) {
    return (
      <EmptyState
        title="No properties"
        subtitle="No properties found"
      />
    );
  }


  return (
    <div className="flex flex-col gap-4 my-4">
      {properties.map((property) => (
        <ManagePropertyCard
          key={property.id}
          property={property}
          status={status}
          isAdmin
        />
      ))}
    </div>
  );
};


export default AdminProperties;