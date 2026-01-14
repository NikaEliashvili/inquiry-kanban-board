"use client";
import ClientNameFilter from "@/components/filters/client-name-filter";
import EventDateFromFilter from "@/components/filters/event-from-filter";
import EventDateToFilter from "@/components/filters/event-to-filter";
import PriceSlider from "@/components/filters/price-slider";
import { formatCurrency, getRGBColor } from "@/lib/utils";
import { InquiryPhase, PHASE_CONFIG } from "@/types/inquiry";
import { Filter } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="relative w-full max-w-full px-4 space-y-2 pb-4">
      <div className="flex flex-col gap-4 bg-background p-4 rounded-lg ">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <Filter className="size-4" />
            <span className="text-base font-medium">Filters</span>
          </div>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 pointer-events-none">
          <ClientNameFilter />
          <EventDateFromFilter />
          <EventDateToFilter />
          <PriceSlider />
        </div>
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto py-1">
        <ColumnSkeleton type="new" />
        <ColumnSkeleton type="sent_to_hotels" />
        <ColumnSkeleton type="offers_received" />
        <ColumnSkeleton type="completed" />
      </div>
    </div>
  );
};

export const KanbanSkeleton = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto py-1">
      <ColumnSkeleton type="new" />
      <ColumnSkeleton type="sent_to_hotels" />
      <ColumnSkeleton type="offers_received" />
      <ColumnSkeleton type="completed" />
    </div>
  );
};

const ColumnSkeleton = ({ type }: { type: InquiryPhase }) => {
  return (
    <div
      className={
        "flex flex-col bg-background/50  rounded-xl w-full min-w-[300px] max-w-[900px] flex-1 pb-8 relative  "
      }
    >
      <div className=" flex flex-col gap-3 py-4 px-2 pb-0">
        <div className="flex items-center gap-3">
          <div
            className={"rounded-full size-3"}
            style={{
              backgroundColor: getRGBColor(PHASE_CONFIG?.[type]?.rgb),
            }}
          />
          <span className="font-semibold">
            {PHASE_CONFIG?.[type]?.label || ""}
          </span>
          <span className="text-sm ml-auto mr-4 font-medium text-muted-foreground">
            0
          </span>
        </div>
        <div className="text-base flex items-center gap-1">
          <span className="text-muted-foreground font-normal">Total:</span>
          <span className=" font-semibold">{formatCurrency(0)}</span>
        </div>
      </div>
      <div className="h-[1px] w-full bg-muted-foreground/10 my-6" />
      <div className="flex flex-col gap-4 px-2 min-h-[120px]">
        <div className="w-full h-36 place-content-center border rounded-lg bg-muted">
          <p className="text-sm text-center font-medium text-muted-foreground">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
