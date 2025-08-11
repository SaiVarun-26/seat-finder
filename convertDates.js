import fs from "fs";

const data = JSON.parse(fs.readFileSync("./public/seatData.json", "utf8"));
const converted = {};

for (const reg in data) {
  converted[reg] = {};
  for (const date in data[reg]) {
    const [year, month, day] = date.split("-");
    const newDate = `${day}-${month}-${year}`;
    converted[reg][newDate] = data[reg][date];
  }
}

fs.writeFileSync("./public/seatData.json", JSON.stringify(converted, null, 2));
console.log("✅ Converted seatData.json dates to DD-MM-YYYY format!");
