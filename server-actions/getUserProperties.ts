"use server";

import axios from "axios";
import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "@/database/db";

export const getUserProperties = async () => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return [];
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    console.log(error);
  }
};
