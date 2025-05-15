// Simulated seat data
const seatData = {
  "RA2411027020142": {
    "2025-05-16": {
      "room": "Block A - Room 204",
      "seat": "A12",
      "subject": "Engineering Maths"
    }
  }
};

// This mock function simulates an API call to find seat data
export function findSeatInfo(regNumber, examDate) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = seatData[regNumber]?.[examDate];
      if (student) {
        resolve({ success: true, data: student });
      } else {
        reject({ success: false, message: 'Register number not found for this date.' });
      }
    }, 300);
  });
}