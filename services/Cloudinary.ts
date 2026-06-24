import cloudinary from "@/lib/cloudinary";

export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
};


export const uploadToCloudinary = async (file: File) : Promise<CloudinaryUploadResult> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    try {
        const result = await cloudinary.uploader.upload(dataUrl, {
            folder: "propertymarket",
            transformation: [{format: "webp"}]
        })
        return {
            secure_url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        console.log("Failed to upload image", error);
        throw new Error("Failed to upload image");
    }
}