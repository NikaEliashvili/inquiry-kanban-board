import { HIGH_VALUE_INDICATOR } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import React, { FC } from "react";

interface HighValueProps {
  className?: string;
  iconClassName?: string;
  text?: string;
}

const HighValue: FC<HighValueProps> = ({ className, iconClassName, text }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 bg-amber-100/40 py-1 px-2 rounded-full text-amber-400 font-medium text-[11px]",
        className
      )}
      title={`Potential value is greater than ${formatCurrency(
        HIGH_VALUE_INDICATOR
      )}`}
    >
      <TrendingUp className={cn("size-3", iconClassName)} />
      <span className="">{text || "HIGH"}</span>
    </div>
  );
};

export default HighValue;
