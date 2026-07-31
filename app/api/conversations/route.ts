import { prisma } from "@/database/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    if (!propertyId) {
      return NextResponse.json(
        {
          message: "propertyId required",
        },
        {
          status: 400,
        },
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
        },
        {
          status: 404,
        },
      );
    }

    // Không cho tự chat với chính mình

    if (property.ownerId === currentUser.id) {
      return NextResponse.json(
        {
          message: "Cannot contact yourself",
        },
        {
          status: 400,
        },
      );
    }

    let conversation = await prisma.conversation.findUnique({
      where: {
        propertyId_buyerId: {
          propertyId,
          buyerId: currentUser.id,
        },
      },
    });

    if (!conversation) {
      try {
        conversation = await prisma.conversation.create({
          data: {
            propertyId,

            buyerId: currentUser.id,

            sellerId: property.ownerId,
          },
        });
      } catch (e: any) {
        if (e.code === "P2002") {
          conversation = await prisma.conversation.findUnique({
            where: {
              propertyId_buyerId: {
                propertyId,
                buyerId: currentUser.id,
              },
            },
          });
        } else {
          throw e;
        }
      }
    }

    return NextResponse.json(conversation, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = currentUser.id;

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          buyerId: userId,
        },
        {
          sellerId: userId,
        },
      ],
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

    orderBy: {
      lastMessageAt: "desc",
    },
  });

  return NextResponse.json(conversations);
}
