import axios from "axios";

export const wishlistService = {
  getWishlist: async () => {
    const { data } = await axios.get("/api/wishlist");
    return data.data;
  },

  toggle: async (propertyId: string) => {
    const { data } = await axios.post("/api/wishlist/toggle", {
      propertyId,
    });

    return data;
  },
};