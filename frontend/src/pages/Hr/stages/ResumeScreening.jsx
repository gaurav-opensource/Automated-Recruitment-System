import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import BASE_URL from "../../../apiConfig";

const ResumeScreening = ({ job, onStageUpdate }) => {
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (!job) return;

    const fetchApplicants = async () => {
      try {
        setLoadingApplicants(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/job/students/${job._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data || []);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        alert("Failed to fetch applicants");
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchApplicants();
  }, [job]);

  const handleProcessResumes = async () => {
  if (!job) return;
  setProcessing(true);

  try {
    const token = localStorage.getItem("token");

    // Resume screening also moves the job to profile when the backend completes.
    const scoreRes = await axios.post(
      `${BASE_URL}/job/${job._id}/resume-screen`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setApplicants(scoreRes.data.results || []);
    alert(
      `Resume screening completed. Scored: ${scoreRes.data.scoredCount || 0}, skipped/failed: ${scoreRes.data.skippedOrFailedCount || 0}.`
    );
    if (onStageUpdate) onStageUpdate();
  } catch (err) {
    console.error("Error processing resumes:", err);
    alert(err.response?.data?.message || "Failed to process resumes.");
  } finally {
    setProcessing(false);
  }
};


  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Resume Screening</h3>
      {job ? (
        <>
          <p>
            Processing resumes for job: <strong>{job.title}</strong>
          </p>

          <button
            onClick={handleProcessResumes}
            disabled={processing}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {processing ? "Processing..." : "Process Resumes"}
          </button>

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Applicants:</h4>
            {loadingApplicants ? (
              <p>Loading applicants...</p>
            ) : applicants.length === 0 ? (
              <p>No applicants found.</p>
            ) : (
              <ul className="space-y-2">
                {applicants.map((student) => (
                 <li
                    key={student._id}
                    className="p-3 border rounded bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{student.userId?.name}</p>
                      <p className="text-sm text-gray-600">
                        {student.userId?.email || student.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        Resume Score: {student.resumeScore ?? student.score ?? "N/A"}
                      </p>
                      {student.status && (
                        <p className="text-xs text-gray-500">
                          Status: {student.status}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/student/${student.userId?._id}`)}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Profile
                    </button>
                  </li>

                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p>No job selected.</p>
      )}
    </div>
  );
};

export default ResumeScreening;
