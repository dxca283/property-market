"use client";
import useFilterStore from "@/store/useFilterStore";
import Button from "../ui/Button";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const FilterButton = () => {
  const { onOpen } = useFilterStore();
  return (
    <Button
      variant="outline"
      icon={<HiOutlineAdjustmentsHorizontal size={20} />}
      iconPosition="left"
      onClick={onOpen}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
