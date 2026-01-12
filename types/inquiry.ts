export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryPhase =
  | "new"
  | "sent_to_hotels"
  | "offers_received"
  | "completed";

export interface InquiryFilters {
  search: string;
  dateFrom: string | null;
  dateTo: string | null;
  minValue: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

export const PHASE_CONFIG: Record<
  InquiryPhase,
  { label: string; rgb: RGBColor }
> = {
  new: { label: "New", rgb: { r: 36, g: 99, b: 235 } },
  sent_to_hotels: { label: "Sent to Hotels", rgb: { r: 124, g: 59, b: 237 } },
  offers_received: { label: "Offers Received", rgb: { r: 245, g: 159, b: 10 } },
  completed: { label: "Completed", rgb: { r: 33, g: 196, b: 93 } },
};

export const PHASES: InquiryPhase[] = [
  "new",
  "sent_to_hotels",
  "offers_received",
  "completed",
];

export type BoardState = {
  [columnId: string]: Inquiry[];
};
