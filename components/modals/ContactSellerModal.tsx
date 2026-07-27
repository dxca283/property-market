"use client";

import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import Modal from "./Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useContactSeller } from "@/hooks/useContactSeller";

const ContactSellerModal = () => {
  const { isContactModalOpen, closeContactModal, pendingProperty } =
    useChatStore();
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useContactSeller();

  const handleClose = () => {
    setMessage("");
    closeContactModal();
  };

  const handleSend = () => {
    if (!message.trim() || !pendingProperty) return;
    mutate(
      { content: message, propertyId: pendingProperty.propertyId },
      { onSuccess: () => setMessage("") }
    );
  };

  return (
    <Modal
      isOpen={isContactModalOpen}
      onClose={handleClose}
      title="Contact Seller"
    >
      {/* Seller name */}
      <p className="text-sm text-gray-500 mb-4">
        Seller:{" "}
        <span className="font-semibold text-gray-800">
          {pendingProperty?.seller.name ?? "—"}
        </span>
      </p>

      {/* Message textarea — reuses same Input component as chat */}
      <Input
        as="textarea"
        name="contact-message"
        label="Message"
        value={message}
        onchange={(e) => setMessage(e.target.value)}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleClose}
          disabled={isPending}
          className="px-4 py-2 rounded-xl text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <Button disabled={!message.trim() || isPending} onClick={handleSend}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </Modal>
  );
};

export default ContactSellerModal;
