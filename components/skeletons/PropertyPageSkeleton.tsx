import { getTranslations } from "next-intl/server";

const PropertyPageSkeleton = async () => {
  const t = await getTranslations("property")
  return (
    <div className="animate-pulse">
      <div className="grid gap-10 lg:grid-cols-3">
        {/* left */}
        <div className="lg:col-span-2">
          <div className="rounded-[28px] border border-black/5 bg-card p-8 shadow-sm">
            <h2 className="h-8 w-40 rounded bg-gray-200"></h2>
            <p className="mt-4 h-16 w-full rounded bg-gray-200"></p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="h-8 w-24 rounded bg-gray-200"></div>
              <div className="h-8 w-24 rounded bg-gray-200"></div>
              <div className="h-8 w-24 rounded bg-gray-200"></div>
              <div className="h-8 w-24 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
          <p className="text-sm text-gray-400">{t("propertyPrice")}</p>
          <h2 className="mt-2 h-10 w-32 rounded bg-gray-200"></h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyPageSkeleton