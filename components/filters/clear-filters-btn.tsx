import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/store/filters-store";
import { X } from "lucide-react";
import React from "react";

const ClearFiltersBtn = () => {
  const { clearFilters, filtersCount } = useFiltersStore();
  const isActive = filtersCount > 0;
  return (
    <button
      name="Clear all filters"
      className={cn(
        "text-sm flex items-center gap-2 p-2 bg-muted rounded-lg font-medium active:scale-95 transition duration-300",
        !isActive && "opacity-0 -translate-y-1/2 pointer-events-none "
      )}
      onClick={() => {
        clearFilters();
      }}
      disabled={!isActive}
      draggable={false}
    >
      <X className="size-4" />
      <span>Clear all filters</span>
    </button>
  );
};

export default ClearFiltersBtn;
