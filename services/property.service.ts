import { prisma } from "@/database/db";
import { GetPropertiesParams } from "@/types/property";
import { Prisma } from "@/app/generated/prisma/client";
import { getCache, setCache } from "@/lib/cache";
import { cacheKeys } from "@/lib/cache-keys";
import { socketServer } from "@/lib/sockerServer";

export const getProperties = async (params: GetPropertiesParams) => {
  const { cursor, limit = 4 } = params;
  const properties = await prisma.property.findMany({
    where: {
      ...(params.propertyType && {
        propertyType: params.propertyType,
      }),
      status: "APPROVED",

      ...(params.location && {
        location: {
          contains: params.location,
          mode: "insensitive",
        },
      }),
      ...(params.address && {
        address: {
          contains: params.address,
          mode: "insensitive",
        },
      }),

      ...(params.search && {
        OR: [
          {
            title: {
              contains: params.search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: params.search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: params.search,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: params.search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(params.minPrice || params.maxPrice
        ? {
            price: {
              ...(params.minPrice && {
                gte: Number(params.minPrice),
              }),
              ...(params.maxPrice && {
                lte: Number(params.maxPrice),
              }),
            },
          }
        : {}),
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    take: limit + 1,

    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,

    skip: cursor ? 1 : 0,
  });
  let nextCursor: string | undefined;

  if (properties.length > limit) {
    properties.pop();

    nextCursor = properties[properties.length - 1]?.id;
  }

  return {
    items: properties,
    nextCursor,
  };
};

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

export const approvePropertyService = async (propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "PENDING") {
    throw new Error("Property has already been reviewed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProperty = await tx.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        rejectionReason: null,
      },
    });

    const notification = await tx.notification.create({
      data: {
        userId: property.ownerId,
        type: "PROPERTY",
        title: "Property Approved",
        message: `Your property "${property.title}" has been approved.`,
        data: {
          action: "approved",
          propertyId: property.id,
        },
      },
    });

    return {
      updatedProperty,
      notification,
    };
  });
  try {
    await socketServer.post("/events/notification", {
      userId: result.updatedProperty.ownerId,
      notification: result.notification,
    });
  } catch (error) {
    console.error("[SOCKET_EMIT]", error);
  }

  return result;
};

export const rejectPropertyService = async (
  propertyId: string,
  reason: string,
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "PENDING") {
    throw new Error("Property has already been reviewed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProperty = await tx.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectionReason: reason,
      },
    });

    const notification = await tx.notification.create({
      data: {
        userId: property.ownerId,
        type: "PROPERTY",
        title: "Property Rejected",
        message: `Your property "${property.title}" has been rejected.`,
        data: {
          action: "rejected",
          propertyId: property.id,
          reason,
        },
      },
    });

    return {
      updatedProperty,
      notification,
    };
  });
  try {
    await socketServer.post("/events/notification", {
      userId: result.updatedProperty.ownerId,
      notification: result.notification,
    });
  } catch (error) {
    console.error("[SOCKET_EMIT]", error);
  }

  return result;
};
