import React, { FC, useMemo } from "react";
import InquiryCard from "./inquiry-card";
import { Inquiry, InquiryPhase, PHASE_CONFIG } from "@/types/inquiry";
import { cn, formatCurrency, getRGBColor } from "@/lib/utils";

import { useDroppable } from "@dnd-kit/core";

interface KanbanBoardProps {
  type: InquiryPhase;
  inquiries: Inquiry[];
}

const KanbanColumn: FC<KanbanBoardProps> = ({ type, inquiries = [] }) => {
  const { setNodeRef, isOver, active, over } = useDroppable({
    id: type,
  });
  const inquiriesCount = inquiries.length || 0;
  const totalValue = useMemo(() => {
    return inquiries.reduce((acc, cur) => acc + cur.potentialValue, 0);
  }, [inquiries]);

  const isColumnActive = isOver || inquiries.some((i) => i.id === over?.id);

  return (
    <div
      className={cn(
        "flex flex-col bg-background/50  rounded-xl w-full min-w-[300px] max-w-[900px] flex-1 pb-8 relative ",
        isColumnActive && "ring ring-primary/5"
      )}
    >
      <div className=" flex flex-col gap-3 py-4 px-2 pb-0 sticky top-0 ">
        <div className="flex items-center gap-3">
          <div
            className={cn("rounded-full size-3")}
            style={{
              backgroundColor: getRGBColor(PHASE_CONFIG?.[type]?.rgb),
            }}
          />
          <span className="font-semibold">
            {PHASE_CONFIG?.[type]?.label || ""}
          </span>
          <span className="text-sm ml-auto mr-4 font-medium text-muted-foreground">
            {inquiriesCount}
          </span>
        </div>
        <div className="text-base flex items-center gap-1">
          <span className="text-muted-foreground font-normal">Total:</span>
          <span className=" font-semibold">{formatCurrency(totalValue)}</span>
        </div>
      </div>
      <div className="h-[1px] w-full bg-muted-foreground/10 my-6" />

      <div
        ref={setNodeRef}
        className={cn("flex flex-col gap-4 px-2 min-h-[120px]")}
      >
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))
        ) : (
          <div
            className={cn(
              "w-full h-32 place-content-center border-2 border-dashed rounded-lg ",
              isColumnActive && "border-primary bg-primary/5"
            )}
          >
            <p className="text-center text-muted-foreground text-sm">
              {active ? " Drop here" : "No inquiries"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
