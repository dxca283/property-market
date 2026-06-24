"use client";
import useCreatePropertyModal from "@/store/usePropertyStore";
import Modal from "./Modal";
import { useState } from "react";
import Button from "../ui/Button";
import { propertyTypes } from "@/contants/PropertyTypes";
import PropertyTypeCard from "../properties/PropertyTypeCard";
import Input from "../ui/Input";
import Counter from "../properties/Counter";
import ImageUpload from "../properties/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  PRICE: 5,
  IMAGES: 4,
};

const CreatePropertyModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useCreatePropertyModal();
  const [step, setStep] = useState(STEPS.TYPE);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Enter location";
      case STEPS.DETAILS:
        return "Enter details";
      case STEPS.FEATURES:
        return "Enter features";
      case STEPS.PRICE:
        return "Enter price";
      case STEPS.IMAGES:
        return "Upload property images";
      default:
        return "";
    }
  };
  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createListing = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price.toString());
      formData.append("location", location);
      formData.append("area", area);
      formData.append("address", address);
      formData.append("description", description);
      formData.append("bathrooms", bathrooms.toString());
      formData.append("bedrooms", bedrooms.toString());
      formData.append("propertyType", propertyType as string);
      formData.append("listingType", listingType);
      formData.append("parkingSpaces", parkingSpaces.toString());
      if (image) {
        formData.append("image", image)
      }
      await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      toast.success("Property created successfully")
      router.replace("/properties");
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setStep(STEPS.TYPE)
    setPropertyType(null)
    setLocation("")
    setAddress("")
    setBedrooms(1)
    setBathrooms(1)
    setParkingSpaces(0)
    setArea("")
    setTitle("")
    setDescription("")
    setImage(null)
    setPreview(null)
    setListingType("sale")
    setPrice("")
    onClose();
  }
  return (
    <Modal title="Create a new listing" isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
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
        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms "
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms "
              value={bathrooms}
              onChange={setBathrooms}
            />
            <Counter
              title="Parking spaces"
              subTitle="How many parking spaces "
              value={parkingSpaces}
              onChange={setParkingSpaces}
            />
            <Input
              name="area"
              label="Property Area (sqft)"
              type="number"
              value={area}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArea(e.target.value)
              }
            />
          </div>
        )}
        {step === STEPS.FEATURES && (
          <div className="space-y-6 ">
            <Input
              name="title"
              label="Property title"
              value={title}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Input
              as="textarea"
              name="description"
              label="Property Description"
              value={description}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
        )}
        {step === STEPS.IMAGES && (
          <ImageUpload preview={preview} onChange={handleImageChange} />
        )}
        {step === STEPS.PRICE && (
          <div className="space-y-6">
            <select
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "rent" | "sale")
              }
              className="h-13 w-full rounded-2xl border border-black/10 px-4"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <Input
              name="price"
              label={listingType === "sale" ? "Sale Price" : "Monthly Rent"}
              type="number"
              value={price}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
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
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : createListing()
          }
          loading={loading}
        >
          {step === STEPS.PRICE ? "Create listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;
