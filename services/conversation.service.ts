import axios from "axios";

export const conversationService = {
  getConversations: async () => {
    const { data } = await axios.get("/api/conversations");
    return data;
  },

  createConversation: async ({ propertyId }: { propertyId: string }) => {
    const { data } = await axios.post("/api/conversations", {
      propertyId,
    });
    return data;
  },

  markAsRead: async (conversationId: string) => {
    const { data } = await axios.patch(
      `/api/conversations/${conversationId}/read`,
    );
    return data;
  },
};
