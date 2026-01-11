import { BASE_API_URL } from "@/lib/constants";

export const getInquiries = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/inquiries`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Get Inquiries Error.", err);
    throw new Error(`Get Inquiries Error. ${err}`);
  }
};
