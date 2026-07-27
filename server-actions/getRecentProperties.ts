import { prisma } from "@/database/db";

export const getRecentProperties = async () => {
  try {
    const properties = await prisma.property.findMany({
      take: 6,
      where: {
        status: "APPROVED",
      },
      orderBy: { createdAt: "desc" },
    });
    return properties;
  } catch (error) {
    console.error("Failed to fetch latest properties", error);
    return [];
  }
};
