"use client";
import useCreatePropertyModal from "@/store/usePropertyStore";
import Modal from "./Modal";
import { useState } from "react";
import Button from "../ui/Button";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  PRICE: 5,
  IMAGES: 4,
};

const CreatePropertyModal = () => {
  const { isOpen, onClose } = useCreatePropertyModal();
  const [step, setStep] = useState(STEPS.TYPE);
  const [loading, setLoading] = useState(false);
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
  const createListing = () => {};
  return (
    <Modal title="Create a new listing" isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
        <span className="font-medium text-gray-700 ">{stepTitle()}</span>
      </div>
      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
            <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-scroll no-scrollbar"></div>
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
