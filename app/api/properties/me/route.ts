import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/database/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { PropertyStatus } from "@/app/generated/prisma/enums";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json([], { status: 200 });
    }

    const status = req.nextUrl.searchParams.get("status");
    if (
      status &&
      !Object.values(PropertyStatus).includes(status as PropertyStatus)
    ) {
      return NextResponse.json(
        { message: "Invalid property status" },
        { status: 400 },
      );
    }
    const properties = await prisma.property.findMany({
      where: {
        ownerId: user.id,
        ...(status && { status: status as PropertyStatus }),
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
      { status: 500 },
    );
  }
}
