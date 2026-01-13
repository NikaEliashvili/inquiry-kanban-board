import { BoardState, Inquiry } from "@/types/inquiry";
import { create } from "zustand";

interface InquiryState {
  board: BoardState | null;
  setBoard: (newBoard: BoardState | null) => void;
  inquiriesList: Inquiry[];
  setInquiriesList: (inquiries: Inquiry[]) => void;
  selectedInquiry: Inquiry | null;
  setSelectedInquiry: (inquiry: Inquiry | null) => void;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  board: null,
  setBoard: (newBoard) => set({ board: newBoard }),
  inquiriesList: [],
  setInquiriesList: (inquiries) => set({ inquiriesList: inquiries }),
  selectedInquiry: null,
  setSelectedInquiry: (inquiry) => set({ selectedInquiry: inquiry }),
}));
