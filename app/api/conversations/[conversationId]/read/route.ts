import { prisma } from "@/database/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  try {
    const { conversationId } = await params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        buyerId: true,
        sellerId: true,
      },
    });

    if (!conversation) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (
      conversation.buyerId !== currentUser.id &&
      conversation.sellerId !== currentUser.id
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const isBuyer = conversation.buyerId === currentUser.id;

    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        ...(isBuyer ? { buyerUnread: 0 } : { sellerUnread: 0 }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONVERSATION_READ_PATCH]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
