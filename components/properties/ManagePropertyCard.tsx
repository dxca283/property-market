"use client";
import { Property } from "@/types/property";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useFormatter } from "next-intl";
import { MoreVertical, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminPropertyStore } from "@/store/useAdminPropertyStore";
import Button from "../ui/Button";
import { useApproveProperty } from "@/hooks/useAdminPropertiesMutation";

interface ManagePropertyCardProps {
  property: Property & { 
    rejectionReason?: string;
  };
  status?: string;
  isAdmin?: boolean;
}

const ManagePropertyCard = ({
  property,
  status,
  isAdmin,
}: ManagePropertyCardProps) => {
  const t = useTranslations("property");
  const format = useFormatter();
  const { onOpen } = useAdminPropertyStore();
  const { mutate: approve, isPending: isApproving } = useApproveProperty();

  const handleApprove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    approve(property.id);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen(property.id);
  };

  return (
    <Link
      href={`/property/${property.id}`}
      className="group flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-lg dark:hover:border-white/20"
    >
      {/* Left: Image */}
      <div className="relative h-48 w-full sm:w-64 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          <div className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-primary shadow-sm">
            {property.listingType === "rent" ? t("forRent") : t("forSale")}
          </div>
          {status && (
            <div
              className={`rounded-full px-2 py-1 text-xs font-semibold text-white shadow-sm ${
                status === "APPROVED"
                  ? "bg-green-500"
                  : status === "PENDING"
                    ? "bg-orange-500"
                    : "bg-red-500"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </div>
          )}
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {property.location}
              </p>
            </div>

            <div
              className="shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {isAdmin && status === "PENDING" ? (
                <div className="flex gap-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 h-9 px-4 rounded-md text-sm text-white"
                    onClick={handleApprove}
                    loading={isApproving}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 h-9 px-4 rounded-md text-sm"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted text-muted-foreground">
                    <MoreVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => console.log("Edit", property.id)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => console.log("Delete", property.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-end gap-2 font-bold text-primary text-2xl">
            {format.number(property.price)}
            {property.listingType === "rent" && (
              <span className="text-sm font-normal text-muted-foreground mb-1">
                /{t("month")}
              </span>
            )}
          </div>

          <div className="mt-2 inline-block rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            {property.propertyType}
          </div>
        </div>

        {/* Bottom: Features and Status Reason */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {property.bedrooms}
              </span>{" "}
              {t("beds")}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {property.bathrooms}
              </span>{" "}
              {t("bathrooms")}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {property.area}
              </span>{" "}
              {t("sqft")}
            </div>
          </div>

          {/* Rejection Reason */}
          {status === "REJECTED" && (
            <div
              className="text-sm text-destructive max-w-xs sm:max-w-md truncate"
              title={property.rejectionReason || "No reason provided."}
            >
              <span className="font-semibold">Reason:</span>{" "}
              {property.rejectionReason || "Violation of terms (Example)"}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ManagePropertyCard;
