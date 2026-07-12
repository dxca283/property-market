import { NextResponse } from "next/server";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { prisma } from "@/database/db";
import { sendMessageSchema } from "@/schemas/message.schema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();
    const { conversationId, content } = sendMessageSchema.parse(body);

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        {
          message: "Conversation not found",
        },
        {
          status: 404,
        },
      );
    }

    const isParticipant =
      conversation.buyerId === currentUser.id ||
      conversation.sellerId === currentUser.id;

    if (!isParticipant) {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }
    const message = await prisma.$transaction(async (tx) => {
      const newMessage = await tx.message.create({
        data: {
          conversationId,

          senderId: currentUser.id,

          content,
        },
      });

      await tx.conversation.update({
        where: {
          id: conversationId,
        },

        data: {
          lastMessage: newMessage.content,

          lastSenderId: newMessage.senderId,

          lastMessageAt: newMessage.createdAt,

          buyerUnread:
            conversation.buyerId === currentUser.id
              ? conversation.buyerUnread
              : {
                  increment: 1,
                },

          sellerUnread:
            conversation.sellerId === currentUser.id
              ? conversation.sellerUnread
              : {
                  increment: 1,
                },
        },
      });

      return newMessage;
    });

    return NextResponse.json(message);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
          errors: error.issues,
        },
        { status: 400 },
      );
    }

    console.log("[MESSAGES_POST]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
