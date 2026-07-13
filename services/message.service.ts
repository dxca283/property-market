import axios from "axios";
import { GetMessagesResponse, Message } from "@/types/message";
import { SendMessageValues } from "@/schemas/message.schema";

export const messageService = {
  sendMessage: async (body: SendMessageValues) => {
    const { data } = await axios.post<Message>("/api/messages", body);
    return data;
  },

  getMessages: async (
    conversationId: string,
    cursor?: string
  ) => {
    const { data } = await axios.get<GetMessagesResponse>(
      `/api/conversations/${conversationId}/messages`,
      {
        params: {
          cursor,
        },
      }
    );

    return data;
  },
};