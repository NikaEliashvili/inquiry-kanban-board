export const updateInquiry = async (inquiryId: string, targetPhase: string) => {
  try {
    const res = await fetch(`/api/inquiries/${inquiryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phase: targetPhase,
      }),
    });

    if (!res.ok) {
      throw new Error("Sorry, something went wrong...");
    }
  } catch (error) {
    throw new Error("Sorry, something went wrong...");
  }
};
