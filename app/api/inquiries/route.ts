import { mockInquiries } from "@/data/mock-inquiries";
import { delay } from "@/lib/utils";
import { isAfter, isBefore, isDate, isSameDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clientName = searchParams.get("clientName");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const minValueQuery = searchParams.get("minValue");
    const minValue = Number(minValueQuery);

    let filtered = mockInquiries;

    if (clientName) {
      filtered = filtered.filter((inq) => inq.clientName.includes(clientName));
    }
    if (startDate && isDate(startDate)) {
      filtered = filtered.filter(
        (inq) =>
          isAfter(new Date(inq.eventDate), new Date(startDate)) ||
          isSameDay(new Date(inq.eventDate), new Date(startDate))
      );
    }

    if (endDate && isDate(endDate)) {
      filtered = filtered.filter(
        (inq) =>
          isBefore(new Date(inq.eventDate), new Date(endDate)) ||
          isSameDay(new Date(inq.eventDate), new Date(endDate))
      );
    }
    if (minValue && minValue > 0) {
      filtered = filtered.filter((inq) => inq.potentialValue >= minValue);
    }

    await delay(500);

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error("GET /api/inquiries error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
