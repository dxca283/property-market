import { z } from "zod";

export const sendMessageSchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(500, "Message must be at most 500 characters"),

    conversationId: z
      .cuid2("Invalid conversation id")
      .optional(),

    propertyId: z
      .cuid2("Invalid property id")
      .optional(),
  })
  .refine(
    (data) => !!(data.conversationId || data.propertyId),
    {
      message: "conversationId or propertyId is required",
      path: ["conversationId"],
    }
  );

export type SendMessageValues = z.infer<typeof sendMessageSchema>;