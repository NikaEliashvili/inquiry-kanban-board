"use client";

import React, { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useFiltersStore } from "@/store/filters-store";
import { useInquiryStore } from "@/store/inquiry-store";

const PriceSlider = () => {
  const { inquiriesList } = useInquiryStore();
  const { minValue, updateMinValue } = useFiltersStore();

  const maxValue: number = useMemo(() => {
    return inquiriesList.reduce((acc, cur) => {
      if (cur.potentialValue > acc) acc = cur.potentialValue;

      return acc;
    }, 0);
  }, [inquiriesList]);

  const MAX = inquiriesList.length > 1 ? maxValue : 300_000;
  const percent = (minValue / MAX) * 100;

  return (
    <div className="flex flex-col gap-1 col-span-2">
      <label
        htmlFor="priceSlider"
        className="text-sm text-muted-foreground font-medium "
      >
        Min Value:
        <span className="font-semibold text-foreground ml-2">
          {formatCurrency(minValue)}
        </span>
      </label>

      <div className="relative h-10 w-full">
        <input
          type="range"
          id="priceSlider"
          min={0}
          max={MAX}
          value={minValue}
          step={500}
          onChange={(e) => updateMinValue(+e.target.value)}
          className="absolute  inset-0 z-20 opacity-0 cursor-pointer"
        />
        <div className="h-2 rounded-full bg-muted absolute inset-0 my-auto" />

        <div
          className="h-2 rounded-full bg-primary absolute inset-y-0 my-auto "
          style={{ width: `${percent}%` }}
        />
        <div
          className="size-3 ring ring-primary bg-background rounded-full absolute top-0 bottom-0 my-auto -translate-x-1/2 pointer-events-none"
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
