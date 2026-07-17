"use client";

import { useChatStore } from "@/store/useChatStore";
import Button from "@/components/ui/Button";

interface Props {
  propertyId: string;
  sellerName: string;
  sellerImage: string;
}

const ContactSellerButton = ({ propertyId, sellerName, sellerImage }: Props) => {
  const { openContactModal } = useChatStore();

  return (
    <Button
      variant="outline"
      onClick={() =>
        openContactModal({
          propertyId,
          seller: { name: sellerName, image: sellerImage },
        })
      }
    >
      Send Message
    </Button>
  );
};

export default ContactSellerButton;
