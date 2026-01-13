import {
  BoardState,
  Inquiry,
  InquiryPhase,
  PHASES,
  RGBColor,
} from "@/types/inquiry";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const getRGBColor = ({ r, g, b, alpha = 1 }: RGBColor) => {
  if (r < 0 || r > 255) return;
  if (g < 0 || g > 255) return;
  if (b < 0 || b > 255) return;
  if (alpha < 0 || alpha > 1) return;

  return `rgba(${r},${g},${b}, ${alpha})`;
};

export const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const changeInquiryPhase = (
  activeId: string,
  board: BoardState,
  sourcePhase: InquiryPhase,
  targetPhase: InquiryPhase
): BoardState | null => {
  if (!board) return board;
  const sourceColumn = [...board[sourcePhase]];
  let targetColumn = [...board[targetPhase]];
  sourceColumn.map((inq) =>
    inq.id === activeId ? { ...inq, phase: targetPhase } : inq
  );
  const sourceIndx = sourceColumn.findIndex((inq) => inq.id === activeId);

  const activeInquiry = sourceColumn.splice(sourceIndx, 1)?.[0];

  if (!activeInquiry) return board;

  targetColumn = [activeInquiry, ...targetColumn];

  const updatedBoard = {
    ...board,
    [sourcePhase]: sourceColumn,
    [targetPhase]: targetColumn,
  };
  return updatedBoard;
};

export const buildBoard = (inquiries: Inquiry[]): BoardState =>
  PHASES.reduce((acc, phase) => {
    acc[phase] = inquiries.filter((i) => i.phase === phase);
    return acc;
  }, {} as BoardState);
