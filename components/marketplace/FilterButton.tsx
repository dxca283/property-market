"use client";
import useFilterStore from "@/store/useFilterStore";
import Button from "../ui/Button";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useTranslations } from "next-intl";

const FilterButton = () => {
  const { onOpen } = useFilterStore();
  const t = useTranslations("filter");
  return (
    <Button
      variant="outline"
      icon={<HiOutlineAdjustmentsHorizontal size={20} />}
      iconPosition="left"
      onClick={onOpen}
    >
      {t("filter")}
    </Button>
  );
};

export default FilterButton;
