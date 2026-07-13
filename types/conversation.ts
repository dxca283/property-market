export interface Conversation {
  id: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  lastMessage: string | null;
  lastSenderId: string | null;
  lastMessageAt: string | null;
  buyerUnread: number;
  sellerUnread: number;
  property: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  buyer: {
    id: string;
    name: string | null;
    image: string | null;
  };
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
}