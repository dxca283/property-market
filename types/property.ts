export interface Property {
  id: string;
  title: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;

  listingType: string;
  propertyType: string;

  parkingSpaces: number;
  description: string;

  createdAt: Date;
  updatedAt: Date;

  ownerId: string;
}


export interface GetPropertiesParams {
  search?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  address?: string;

  cursor?: string;
  limit?: number;
}

export interface PropertiesResponse {
  items: Property[];
  nextCursor?: string;
}