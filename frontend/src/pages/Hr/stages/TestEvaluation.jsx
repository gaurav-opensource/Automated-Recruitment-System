import { useEffect, useState } from "react";
import axios from "axios";

import BASE_URL from "../../../apiConfig";

export default function TestEvaluation({ job, onStageUpdate }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCount, setSelectCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    if (!job) return;
    fetchStudents();
  }, [job]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/job/test/${job._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = (res.data || []).sort(
        (a, b) => (b.testScore || b.score || 0) - (a.testScore || a.score || 0)
      );
      setStudents(sorted);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTop = () => {
    const count = Math.min(Number(selectCount), students.length);
    if (!count || count <= 0) {
      alert("Enter a valid number of students to select.");
      return;
    }
    const top = students.slice(0, count).map((s) => s._id);
    setSelectedStudents(top);
  };

  const handleToggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleConfirmTopSelection = async () => {
    const count = Math.min(Number(selectCount), students.length);
    if (!count || count <= 0) {
      alert("Enter a valid number of students to select.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/job/${job._id}/shortlist/test`,
        { topN: count },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Top ${count} students moved to interview.`);
      if (onStageUpdate) onStageUpdate();
    } catch (err) {
      console.error("Error selecting top test scores:", err);
      alert(err.response?.data?.message || "Failed to select top students.");
    }
  };

  const handleConfirmSelection = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      // Update job stage to interview
      await axios.post(
        `${BASE_URL}/job/${job._id}/stageChange`,
        { stage: "interview" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update selected students' stage to interview
      await axios.post(
        `${BASE_URL}/job/${job._id}/stageChangeInStudent`,
        { studentIds: selectedStudents, stage: "interview" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Interview stage updated for selected students.");
      if (onStageUpdate) onStageUpdate();
    } catch (err) {
      console.error("Error updating stages:", err);
      alert("Failed to update stages.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Test Evaluation</h2>

      <div>
          <p>Total Students: {students.length}</p>

          <div className="my-4">
            <input
              type="number"
              min="1"
              max={students.length}
              value={selectCount}
              onChange={(e) => setSelectCount(Number(e.target.value))}
              placeholder="Enter number of top students to select"
              className="border p-2 mr-2"
            />
            <button
              onClick={handleSelectTop}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Preview Top Students
            </button>
            <button
              onClick={handleConfirmTopSelection}
              className="bg-blue-600 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
            >
              Move Top To Interview
            </button>
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold mb-2">Select Students Manually:</h3>
            {loading ? (
              <p>Loading students...</p>
            ) : students.length === 0 ? (
              <p>No completed tests found yet.</p>
            ) : (
              <ul className="max-h-64 overflow-auto border p-2 rounded space-y-2">
                {students.map((student) => (
                  <li key={student._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleToggleStudent(student._id)}
                    />
                    <div>
                      <p>{student.userId?.name}</p>
                      <p className="text-sm text-gray-600">
                        Score: {student.testScore ?? student.score ?? 0}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleConfirmSelection}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm Selection & Update Stage
          </button>
      </div>
    </div>
  );
}
