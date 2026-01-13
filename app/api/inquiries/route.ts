import { getInquiries } from "@/data/data-handler";
import { delay } from "@/lib/utils";
import { isAfter, isBefore, isDate, isSameDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clientName = searchParams.get("clientName");
    const startDate = searchParams.get("eventFrom");
    const endDate = searchParams.get("eventTo");
    const minValueQuery = searchParams.get("minValue");
    const minValue = Number(minValueQuery);

    const inquiriesList = getInquiries();

    const filtered = inquiriesList.filter((inq) => {
      let hasMatch = true;
      if (clientName) {
        hasMatch = inq.clientName
          .toLocaleLowerCase()
          .includes(clientName.toLocaleLowerCase());
      }
      if (!hasMatch) return false;

      if (startDate && isDate(new Date(startDate))) {
        hasMatch =
          isAfter(new Date(inq.eventDate), new Date(startDate)) ||
          isSameDay(new Date(inq.eventDate), new Date(startDate));
      }
      if (!hasMatch) return false;
      if (endDate && isDate(new Date(endDate))) {
        hasMatch =
          isBefore(new Date(inq.eventDate), new Date(endDate)) ||
          isSameDay(new Date(inq.eventDate), new Date(endDate));
      }
      if (!hasMatch) return false;
      if (minValue && minValue > 0) {
        hasMatch = inq.potentialValue >= minValue;
      }
      return hasMatch;
    });

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
