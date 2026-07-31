import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/database/db";
import { getCache, setCache } from "@/lib/cache";
import { cacheKeys } from "@/lib/cache-keys";

type PropertyWithOwner = Prisma.PropertyGetPayload<{
  include: {
    owner: {
      select: {
        id: true;
        name: true;
        email: true;
        image: true;
      };
    };
  };
}>;

export const getProperty = async (propertyId: string) => {
  const cacheKey = cacheKeys.propertyDetail(propertyId);
  const cachedProperty = await getCache<PropertyWithOwner>(cacheKey);

  if (cachedProperty) {
    console.log("✅ Property cache hit");

    return cachedProperty;
  }

  console.log("❌ Property cache miss");
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
    await setCache(cacheKey, property, 300);
    return property;
  } catch (error) {
    console.error(error);
    return null;
  }
};
