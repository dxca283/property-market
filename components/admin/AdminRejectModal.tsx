"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useAdminPropertyStore } from "@/store/useAdminPropertyStore";
import { useRejectProperty } from "@/hooks/useAdminPropertiesMutation";
import toast from "react-hot-toast";
import Modal from "@/components/modals/Modal";

export const AdminRejectModal = () => {
  const { isOpen, onClose, selectedPropertyId } = useAdminPropertyStore();
  const [reason, setReason] = useState("");
  const { mutate: reject, isPending } = useRejectProperty();

  const handleSubmit = () => {
    if (!selectedPropertyId || !reason.trim()) return;
    reject(
      { propertyId: selectedPropertyId, reason },
      {
        onSuccess: () => {
          toast.success("Property rejected successfully!");
          setReason("");
          onClose();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <Modal title="Reject Property" isOpen={isOpen} onClose={onClose}>
      <div className="py-2">
        <label className="mb-2 block text-sm font-medium text-gray-700">Reason for rejection:</label>
        <textarea
          className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black min-h-[120px] transition"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please detail why this property is rejected..."
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          loading={isPending}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Confirm Reject
        </Button>
      </div>
    </Modal>
  );
};
