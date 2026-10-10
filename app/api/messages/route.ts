import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/database/db";
import { sendMessageSchema } from "@/schemas/message.schema";
import { z } from "zod";
import { socketServer } from "@/lib/sockerServer";
import { Prisma } from "@/app/generated/prisma/client";

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

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

    const { conversationId, propertyId, content } =
      sendMessageSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      let conversation;

      // ==========================================
      // CASE 1
      // Conversation đã tồn tại
      // ==========================================

      if (conversationId) {
        conversation = await tx.conversation.findUnique({
          where: {
            id: conversationId,
          },
        });

        if (!conversation) {
          throw new HttpError(404, "Conversation not found");
        }

        const isParticipant =
          conversation.buyerId === currentUser.id ||
          conversation.sellerId === currentUser.id;

        if (!isParticipant) {
          throw new HttpError(403, "Forbidden");
        }
      }

      // ==========================================
      // CASE 2
      // Conversation chưa tồn tại
      // ==========================================
      else {
        const property = await tx.property.findUnique({
          where: {
            id: propertyId,
          },
        });

        if (!property) {
          throw new HttpError(404, "Property not found");
        }

        if (property.ownerId === currentUser.id) {
          throw new HttpError(400, "Cannot contact yourself");
        }

        conversation = await tx.conversation.findUnique({
          where: {
            propertyId_buyerId: {
              propertyId: property.id,
              buyerId: currentUser.id,
            },
          },
        });

        if (!conversation) {
          try {
            conversation = await tx.conversation.create({
              data: {
                propertyId: property.id,
                buyerId: currentUser.id,
                sellerId: property.ownerId,
              },
            });
          } catch (error: unknown) {
            if (
              error instanceof Prisma.PrismaClientKnownRequestError &&
              error.code === "P2002"
            ) {
              conversation = await tx.conversation.findUnique({
                where: {
                  propertyId_buyerId: {
                    propertyId: property.id,
                    buyerId: currentUser.id,
                  },
                },
              });

              if (!conversation) {
                throw new HttpError(500, "Failed to retrieve conversation");
              }
            } else {
              throw error;
            }
          }
        }
      }

      // ==========================================
      // Create Message
      // ==========================================

      const message = await tx.message.create({
        data: {
          conversationId: conversation.id,
          senderId: currentUser.id,
          content,
        },
      });

      // ==========================================
      // Update Conversation
      // ==========================================

      conversation = await tx.conversation.update({
        where: {
          id: conversation.id,
        },

        data: {
          lastMessage: message.content,

          lastSenderId: message.senderId,

          lastMessageAt: message.createdAt,

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

        include: {
          property: {
            select: {
              id: true,
              title: true,
              price: true,
              image: true,
            },
          },

          buyer: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },

          seller: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return {
        conversation,
        message,
      };
    });
    try {
      await socketServer.post("/events/message", {
        conversation: result.conversation,
        message: result.message,
        senderId: currentUser.id,
      });
    } catch (error) {
      console.error("[SOCKET_EMIT]", error);
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
          errors: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof HttpError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        },
      );
    }

    console.error("[MESSAGES_POST]", error);

    return NextResponse.json(
      {
        message: "Internal Error",
      },
      {
        status: 500,
      },
    );
  }
}
