"use server";

import { getProperties } from "@/services/property.service";
import { GetPropertiesParams } from "@/types/property";

export async function getPropertiesAction(params: GetPropertiesParams) {
  return await getProperties(params);
}


