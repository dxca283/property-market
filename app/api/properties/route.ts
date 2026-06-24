import { prisma } from "@/database/db";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/Cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const area = formData.get("area") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const bathrooms = formData.get("bathrooms") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const propertyType = formData.get("propertyType") as string;
    const listingType = formData.get("listingType") as string;
    const parkingSpaces = formData.get("parkingSpaces") as string;

    if (
      !title ||
      !price ||
      !location ||
      !area ||
      !address ||
      !description ||
      !image ||
      !bathrooms ||
      !bedrooms ||
      !propertyType ||
      !listingType ||
      !parkingSpaces
    ) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 },
      );
    }
    //upload the image to cloud using cloudinary
    const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);
    await prisma.property.create({
      data: {
        title,
        description,
        address,
        price: Number(price),
        area: Number(area),
        location,
        bathrooms: Number(bathrooms),
        bedrooms: Number(bedrooms),
        propertyType,
        listingType,
        parkingSpaces: Number(parkingSpaces),
        image: imageData.secure_url,
        ownerId: currentUser.id,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Property created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
