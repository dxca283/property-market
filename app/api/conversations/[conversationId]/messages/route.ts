import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { prisma } from "@/database/db";

const PAGE_SIZE = 50;

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      conversationId: string;
    }>;
  },
) {
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

    const { conversationId } = await params;

    const searchParams = req.nextUrl.searchParams;

    const cursor = searchParams.get("cursor");

    // Kiểm tra conversation có tồn tại
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,

        OR: [
          {
            buyerId: currentUser.id,
          },
          {
            sellerId: currentUser.id,
          },
        ],
      },

      select: {
        id: true,
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

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },

      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: PAGE_SIZE + 1,

      ...(cursor && {
        cursor: {
          id: cursor,
        },
        skip: 1,
      }),
    });

    let nextCursor: string | null = null;

    if (messages.length > PAGE_SIZE) {
      const nextItem = messages.pop();

      nextCursor = nextItem!.id;
    }

    messages.reverse();

    return NextResponse.json({
      messages,
      nextCursor,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
