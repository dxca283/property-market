import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import WishList from "@/components/properties/WishList";
import { getTranslations } from "next-intl/server";

const WishListPage = async () => {
  const t = await getTranslations("common");
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-text md:text-3xl">{t("wishlist")}</h2>
        </div>
        <WishList />
      </div>
    </FrontEndLayout>
  )
}

export default WishListPage