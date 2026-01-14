"use client";
import { Filter } from "lucide-react";
import React, { useEffect } from "react";
import ClientNameFilter from "./client-name-filter";
import PriceSlider from "./price-slider";
import EventDateFromFilter from "./event-from-filter";
import EventDateToFilter from "./event-to-filter";
import { useFiltersStore } from "@/store/filters-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import FiltersCounter from "./filters-counter";
import ClearFiltersBtn from "./clear-filters-btn";

const FiltersPanel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    clientName,
    eventFrom,
    eventTo,
    minValue,
    updateClientName,
    updateEventFrom,
    updateEventTo,
    updateMinValue,
  } = useFiltersStore();

  const debounced = useDebounce(
    { clientName, eventFrom, eventTo, minValue },
    500
  );

  useEffect(() => {
    updateClientName(searchParams.get("clientName") ?? "");
    updateEventFrom(searchParams.get("eventFrom") ?? "");
    updateEventTo(searchParams.get("eventTo") ?? "");
    updateMinValue(Number(searchParams.get("minValue")) || 0);
  }, [
    searchParams,
    updateClientName,
    updateEventFrom,
    updateEventTo,
    updateMinValue,
  ]);

  // Save filters in URL Params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounced.clientName) params.set("clientName", debounced.clientName);
    else params.delete("clientName");

    if (debounced.eventFrom) params.set("eventFrom", debounced.eventFrom);
    else params.delete("eventFrom");
    if (debounced.eventTo) params.set("eventTo", debounced.eventTo);
    else params.delete("eventTo");
    if (debounced.minValue > 0)
      params.set("minValue", String(debounced.minValue));
    else params.delete("minValue");

    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(url, { scroll: false });
  }, [debounced, pathname, router, searchParams]);

  return (
    <div className="flex flex-col gap-4 bg-background p-4 rounded-lg ">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center gap-2">
          <Filter className="size-4" />
          <span className="text-base font-medium">Filters</span>
          <FiltersCounter />
        </div>
        <ClearFiltersBtn />
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ClientNameFilter />
        <EventDateFromFilter />
        <EventDateToFilter />
        <PriceSlider />
      </div>
    </div>
  );
};

export default FiltersPanel;
