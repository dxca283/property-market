import { prisma } from "@/database/db";

export const getProperty = async (propertyId: string) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    if (!property) return null;
    
    return property;
  } catch (error) {
    console.error(error);
    return null;
  }
};
