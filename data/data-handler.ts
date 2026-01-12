import { Inquiry } from "@/types/inquiry";
import { mockInquiries } from "./mock-inquiries";

let inquiries: Inquiry[] = [...mockInquiries];

export function getInquiries() {
  return inquiries;
}

export function updateInquiryPhase(id: string, phase: Inquiry["phase"]) {
  inquiries = inquiries.map((inq) =>
    inq.id === id ? { ...inq, phase, updatedAt: new Date().toISOString() } : inq
  );

  return inquiries;
}
