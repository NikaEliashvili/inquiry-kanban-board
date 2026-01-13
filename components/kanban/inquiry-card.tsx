"use client";
import { HIGH_VALUE_INDICATOR } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { useInquiryStore } from "@/store/inquiry-store";
import { Inquiry } from "@/types/inquiry";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, formatDistance } from "date-fns";
import { Calendar, Users2 } from "lucide-react";
import React, { FC } from "react";
import HighValue from "../high-value";

interface InquiryCardProps {
  inquiry: Inquiry;
  isOverlay?: boolean;
}

const InquiryCard: FC<InquiryCardProps> = ({ inquiry, isOverlay = false }) => {
  const { setSelectedInquiry, inquiriesList } = useInquiryStore();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: inquiry.id });

  const handleClick = () => {
    const freshInquiry = inquiriesList.find((i) => i.id === inquiry.id);
    if (!freshInquiry) return;
    setSelectedInquiry(freshInquiry);
  };

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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
    >
      <div
        className={cn(
          "relative w-full bg-background rounded-lg px-4 py-4 border border-border/50 hover:border-primary/40 transition-all space-y-3 shadow-sm hover:shadow-md cursor-pointer ",
          isHighValue &&
            "ring hover:ring-amber-300 ring-amber-300/0 border-amber-300 hover:border-amber-300",
          isDragging && "opacity-40 "
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
        {isHighValue && <HighValue className="absolute top-2 right-4 " />}
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
    </div>
  );
};

export default InquiryCard;
