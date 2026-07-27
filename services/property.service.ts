import axios from "axios";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/app/generated/prisma/enums";

export const propertyService = {
  getMyProperties: async (status?: PropertyStatus): Promise<Property[]> => {
    const { data } = await axios.get<Property[]>("/api/properties/me", {
      params: { status }
    });
    return data;
  },

  getAdminProperties: async (status?: PropertyStatus): Promise<Property[]> => {
    const { data } = await axios.get<Property[]>("/api/admin/properties", {
      params: { status }
    });
    return data;
  },

  create: async (formData: FormData) => {
    const { data } = await axios.post("/api/properties", formData);
    return data;
  },

  update: async (id: string, body: unknown) => {
    const { data } = await axios.patch(`/api/properties/${id}`, body);
    return data;
  },

  remove: async (id: string) => {
    await axios.delete(`/api/properties/${id}`);
  },
};