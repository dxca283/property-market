import { PropertyStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/database/db";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        },
      );
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
        ...(status && { status: status as PropertyStatus }),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: true,
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
