export type Notification = {
  id: string;

  userId: string;

  type: "PROPERTY" | "MESSAGE" | "SYSTEM";

  title: string;

  message: string;

  data: {
    action?: string;
    propertyId?: string;
    reason?: string;
  };

  isRead: boolean;

  createdAt: string;
}; 