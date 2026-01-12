import { BASE_API_URL } from "@/lib/constants";

interface GetInquiriesParams {
  clientName?: string;
  eventFrom?: string;
  eventTo?: string;
  minValue?: number;
}

export const getInquiries = async ({
  clientName,
  eventFrom,
  eventTo,
  minValue,
}: GetInquiriesParams) => {
  try {
    let params = ``;

    if (clientName) params += `clientName=${clientName}&`;
    if (eventFrom) params += `eventFrom=${eventFrom}&`;
    if (eventTo) params += `eventTo=${eventTo}&`;
    if (minValue) params += `minValue=${minValue}`;

    const res = await fetch(`${BASE_API_URL}/inquiries?${params}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Get Inquiries Error.", err);
    throw new Error(`Get Inquiries Error. ${err}`);
  }
};
