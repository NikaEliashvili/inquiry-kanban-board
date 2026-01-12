"use client";
import { Filter, X } from "lucide-react";
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

  // Save filters in URL Params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const { clientName, eventFrom, eventTo, minValue } = debounced;
    clientName
      ? params.set("clientName", clientName)
      : params.delete("clientName");
    eventFrom ? params.set("eventFrom", eventFrom) : params.delete("eventFrom");
    eventTo ? params.set("eventTo", eventTo) : params.delete("eventTo");
    minValue
      ? params.set("minValue", String(minValue))
      : params.delete("minValue");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debounced]);

  useEffect(() => {
    const clientNameQuery = searchParams.get("clientName");
    const eventFromQuery = searchParams.get("eventFrom");
    const eventToQuery = searchParams.get("eventTo");
    const minValueQuery = searchParams.get("minValue");
    if (clientNameQuery) updateClientName(clientNameQuery);
    if (eventFromQuery) updateEventFrom(eventFromQuery);
    if (eventToQuery) updateEventTo(eventToQuery);
    if (minValueQuery) updateMinValue(Number(minValueQuery));
  }, []);

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
