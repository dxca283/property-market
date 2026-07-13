export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  imageUrl: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface GetMessagesResponse {
  messages: Message[];
  nextCursor: string | null;
}