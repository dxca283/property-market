"use client";
import { Suspense, useState } from "react";
import Modal from "./Modal";
import useFilterStore from "@/store/useFilterStore";
import { propertyTypes } from "@/contants/PropertyTypes";
import PropertyTypeCard from "../properties/PropertyTypeCard";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICE: 2,
};

const FilterModalContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onClose, isOpen } = useFilterStore();
  const [step, setStep] = useState(STEPS.TYPE);
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "",
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [address, setAddress] = useState(searchParams.get("address") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Select a location";
      case STEPS.PRICE:
        return "Select a price range";
      default:
        return "";
    }
  };
  const applyFilter = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (address) params.set("address", address);
    if (propertyType) params.set("propertyType", propertyType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.replace(`/marketplace?${params.toString()}`);
    setStep(STEPS.TYPE);
    onClose();
  };
  return (
    <Modal title="Filter Properties" onClose={onClose} isOpen={isOpen}>
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 3</span>
        <span className="font-medium text-gray-700 ">{stepTitle()}</span>
      </div>
      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                key={item.slug}
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() => setPropertyType(item.slug)}
              />
            ))}
          </div>
        )}
        {step === STEPS.LOCATION && (
          <div className="space-y-6 w=full">
            <Input
              name="location"
              label="Location"
              value={location}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              name="address"
              label="Address"
              value={address}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}
        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Input
                label="Min Price"
                name="min-price"
                type="number"
                value={minPrice}
                onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(e.target.value)
                }
              />
            </div>
            <div>
              <Input
                label="Max Price"
                name="max-price"
                type="number"
                value={maxPrice}
                onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullwidth
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        <Button
          variant="primary"
          fullwidth
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilter()
          }
        >
          {step === STEPS.PRICE ? "Apply filter" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

const FilterModal = () => {
  return (
    <Suspense>
      <FilterModalContent />
    </Suspense>
  );
};

export default FilterModal;
