import { prisma } from "@/database/db";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { propertyId } = await req.json();

    if (!propertyId) {
      return NextResponse.json(
        { message: "propertyId is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.wishList.findUnique({
      where: {
        userId_propertyId: {
          userId: currentUser.id,
          propertyId,
        },
      },
      include: {
        property: true,
      },
    });

    // =========================
    // ❌ REMOVE (unlike)
    // =========================
    if (existing) {
      await prisma.wishList.delete({
        where: {
          userId_propertyId: {
            userId: currentUser.id,
            propertyId,
          },
        },
      });

      return NextResponse.json({
        data: existing.property,
        isWishlisted: false,
      });
    }

    // =========================
    // ❤️ ADD (like)
    // =========================
    const created = await prisma.wishList.create({
      data: {
        userId: currentUser.id,
        propertyId,
      },
      include: {
        property: true,
      },
    });

    return NextResponse.json({
      data: created.property,
      isWishlisted: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}