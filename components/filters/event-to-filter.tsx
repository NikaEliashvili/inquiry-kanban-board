import { useFiltersStore } from "@/store/filters-store";
import { Calendar } from "lucide-react";
import React, { FC } from "react";

const EventDateToFilter = () => {
  const { eventTo, updateEventTo } = useFiltersStore();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="eventToDate"
        className="text-sm text-muted-foreground font-medium"
      >
        Event Date To
      </label>

      <div className="relative">
        <Calendar className="size-4 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          id="eventToDate"
          type="date"
          value={eventTo}
          onChange={(e) => updateEventTo(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
        />
      </div>
    </div>
  );
};

export default EventDateToFilter;
