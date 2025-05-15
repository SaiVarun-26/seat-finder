import { useState } from 'react';
import { findSeatInfo } from './mockApi';

function App() {
  const [regNumber, setRegNumber] = useState('');
  const [examDate, setExamDate] = useState('');
  const [seatInfo, setSeatInfo] = useState(null);
  const [error, setError] = useState('');

  const findSeat = async () => {
    try {
      const res = await findSeatInfo(regNumber, examDate);
      setSeatInfo(res.data);
      setError('');
    } catch (err) {
      setSeatInfo(null);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <h1 className="text-3xl font-bold mb-4">SRMIST Seat Finder</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <label className="block mb-2">Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Register Number</label>
        <input
          type="text"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button onClick={findSeat} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Find My Seat
        </button>

        {seatInfo && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p><strong>Room:</strong> {seatInfo.room}</p>
            <p><strong>Seat:</strong> {seatInfo.seat}</p>
            <p><strong>Subject:</strong> {seatInfo.subject}</p>
          </div>
        )}

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default App;