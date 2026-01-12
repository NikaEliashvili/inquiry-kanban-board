import { useFiltersStore } from "@/store/filters-store";
import React, { useEffect, useState } from "react";

const FiltersCounter = () => {
  const {
    clientName,
    eventFrom,
    eventTo,
    minValue,
    updateFiltersCount,
    filtersCount,
  } = useFiltersStore();

  useEffect(() => {
    let count = 0;
    if (clientName) count++;
    if (eventFrom) count++;
    if (eventTo) count++;
    if (minValue) count++;
    updateFiltersCount(count);
  }, [clientName, eventFrom, eventTo, , minValue]);

  if (!filtersCount) return null;

  return (
    <div className="relative size-6 bg-primary rounded-full flex items-center justify-center">
      <span className="text-background leading-3 text-sm font-semibold">
        {filtersCount}
      </span>
    </div>
  );
};

export default FiltersCounter;
