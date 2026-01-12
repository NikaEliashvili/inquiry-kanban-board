import { updateInquiryPhase } from "@/data/data-handler";
import { mockInquiries } from "@/data/mock-inquiries";
import { delay } from "@/lib/utils";
import { InquiryPhase, PHASES } from "@/types/inquiry";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) throw new Error("ID is required.");
    const { phase } = await req.json();
    if (!PHASES.includes(phase)) throw new Error("Correct Phase is required.");
    delay(500);
    const updatedData = updateInquiryPhase(id, phase);
    if (id === "INQ-2026-0039") throw new Error("Oops.");
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.log("PATCH PHASE ERROR", error);
    return NextResponse.json(
      {
        error: "",
      },
      { status: 500 }
    );
  }
}
