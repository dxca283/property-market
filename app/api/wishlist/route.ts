import { prisma } from "@/database/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const wishlist = await prisma.wishList.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = wishlist.map((item) => item.property);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
