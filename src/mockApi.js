export async function findSeatInfo(regNumber, examDate) {
  // Normalize register number
  const reg = String(regNumber).trim().toUpperCase();

  // Normalize date to DD-MM-YYYY
  function normalizeDate(dateStr) {
    const parts = dateStr.includes("-") ? dateStr.split("-") : dateStr.split("/");
    if (parts[0].length === 4) {
      return `${parts[2].padStart(2, "0")}-${parts[1].padStart(2, "0")}-${parts[0]}`;
    }
    return `${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}-${parts[2]}`;
  }
  const date = normalizeDate(examDate);

  try {
    // Fetch seatData.json from public folder with cache-busting
    const response = await fetch(`/seatData.json?nocache=${new Date().getTime()}`);
    if (!response.ok) {
      throw new Error(`Failed to load seatData.json: ${response.status}`);
    }
    const seatData = await response.json();

    console.log("Looking for:", reg, date); // Debugging

    const student = seatData[reg]?.[date];

    if (student) {
      return { success: true, data: student };
    } else {
      return { success: false, message: `Register number not found for date: ${date}` };
    }
  } catch (error) {
    console.error("Error fetching seat data:", error);
    return { success: false, message: "Error loading seat data. Please try again later." };
  }
}
