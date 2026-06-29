import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  preview: string | null;
  onChange: (file: File) => void;
}

const ImageUpload = async ({ preview, onChange }: ImageUploadProps) => {
  const t = await getTranslations("property")
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  }; 
  return (
    <div className="relative w-full">
      <label
        htmlFor="image-upload"
        className="relative flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl border-2 border-dashed min-h-80 transition hover:border-gray-400 text-gray-600 p-10 border-gray-300"
      >
        {!preview && (
          <>
            <TbPhotoPlus size={36} />
            <p className="font-medium">{t("clickToUpload")}</p>
            <p className="text-sm">{t("uploadOneImage")}</p>
          </>
        )}
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-2xl"
          />
        )}
      </label>
      <input
        type="file"
        id="image-upload"
        hidden
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
