import React, { useState } from "react";
import { findSeatInfo } from "./mockApi";
import "./index.css";

function App() {
  const [regNumber, setRegNumber] = useState("");
  const [examDate, setExamDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setResult(null);
    setError(null);
    const res = await findSeatInfo(regNumber, examDate);
    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Seat Finder</h1>
      <input
        type="text"
        placeholder="Enter Register Number"
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
      />
      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />
      <button onClick={handleSearch}>Find Seat</button>

      {result && (
        <div className="result">
          <p><strong>Block:</strong> {result.block}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
