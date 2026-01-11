"use client";
import { HIGH_VALUE_INDICATOR } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { Inquiry } from "@/types/inquiry";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, formatDistance } from "date-fns";
import { Calendar, TrendingUp, Users2 } from "lucide-react";
import React, { FC } from "react";

interface InquiryCardProps {
  inquiry: Inquiry;
  isOverlay?: boolean;
}

const InquiryCard: FC<InquiryCardProps> = ({ inquiry, isOverlay = false }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: inquiry.id });

  const style = isOverlay
    ? {
        transform: "scale(1.03) rotate(-2deg)",
        boxShadow: "0 8px 16px rgba(0,0,0,.2)",
      }
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  const isHighValue = inquiry?.potentialValue > HIGH_VALUE_INDICATOR;
  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      className={cn(
        "relative w-full bg-background rounded-lg px-4 py-4 border border-border/50 hover:border-primary/40 transition-all space-y-3 shadow-sm hover:shadow-md cursor-pointer active:scale-105  active:-rotate-2",
        isHighValue &&
          "ring hover:ring-amber-300 ring-amber-300/0 border-amber-300 hover:border-amber-300",
        isDragging && "opacity-0"
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold text-wrap break-words",
          isHighValue && " max-w-[calc(100%-4rem)]"
        )}
      >
        {inquiry?.clientName || ""}
      </h3>
      {isHighValue && (
        <div
          className="absolute top-2 right-4 flex items-center justify-center gap-1 bg-amber-100/40 py-1 px-2 rounded-full text-amber-400 font-medium"
          title={`Potential value is greater than ${formatCurrency(
            HIGH_VALUE_INDICATOR
          )}`}
        >
          <TrendingUp className="size-3" />
          <span className="text-[11px]">HIGH</span>
        </div>
      )}
      <div className="flex flex-row gap-2 items-center text-muted-foreground">
        <Calendar className="size-5 text-muted-foreground" />
        <p>
          <span className="text-base">
            {inquiry?.eventDate
              ? format(new Date(inquiry.eventDate), "PP")
              : "--.--.----"}
          </span>{" "}
          <span className="text-sm text-foreground/50">
            (
            {inquiry?.eventDate
              ? formatDistance(new Date(inquiry.eventDate), new Date(), {
                  addSuffix: true,
                })
              : null}
            )
          </span>
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center text-muted-foreground">
        <Users2 className="size-5" />
        <p>{inquiry?.guestCount || 0} guests</p>
      </div>
      <div className="pt-3">
        <div className="h-[1px] w-full bg-muted-foreground/20 " />
      </div>
      <div className="flex items-center justify-between">
        <p className={cn("font-medium", isHighValue && "text-amber-400")}>
          {formatCurrency(inquiry?.potentialValue || 0)}
        </p>
      </div>
    </div>
  );
};

export default InquiryCard;
