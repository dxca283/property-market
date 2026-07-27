import { prisma } from "@/database/db";

export interface GetPropertiesParams {
  search?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  address?: string;
}

export const getProperties = async (params: GetPropertiesParams) => {
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

    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};
