import { NextResponse } from "next/server";
import { prisma } from "@/database/db";
import { getCurrentUser } from "@/server-actions/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json([], { status: 200 });
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}