"use client"
import { HiOutlineHomeModern } from "react-icons/hi2";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  filter?: boolean;
}

const EmptyState = ({ title, subtitle, filter }: EmptyStateProps) => {
  const t = useTranslations("common")
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
        <HiOutlineHomeModern size={40} className="text-primary " />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-text">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-md text-text/60 leading-relaxed">{subtitle}</p>
      )}
      {filter && (
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => router.replace("/marketplace")}
          >
            {t("clearFilters")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
