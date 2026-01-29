import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../apiConfig";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

const PostJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const parseJwt = (token) => {
    if (!token) return null;
    try {
      const base64Payload = token.split(".")[1];
      return JSON.parse(atob(base64Payload));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    setRole(decoded?.role || "");
  }, []);

  const fetchJobs = async (filterDays = "") => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/job/alljob`;
      if (filterDays) url += `?days=${filterDays}`;
      const res = await axios.get(url);
      setJobs(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getTimeElapsed = (dateString) => {
    if (!dateString) return "Recently posted";
    const postDate = new Date(dateString);
    const diff = Math.floor(
      (new Date() - postDate) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "1 day ago";
    return `${diff} days ago`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl animate-pulse">⏳ Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 pt-28 pb-12">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore <span className="text-blue-600">{jobs.length}+</span> Jobs
        </h1>
        <p className="text-gray-600 mt-2">
          Explore full-time roles from startups to top companies
        </p>

        {/* Search */}
        <div className="mt-6 flex gap-3">
          <input
            type="number"
            placeholder="Jobs posted in last X days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64"
          />
          <button
            onClick={() => fetchJobs(days)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="max-w-6xl mx-auto space-y-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-xl p-5 hover:shadow-md transition"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.company}</p>

                  {/* META INFO */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FaBriefcase />
                      {job.experience || "Fresher"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock />
                      {job.jobType || "Full Time"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt />
                      {job.location || "Remote"}
                    </span>
                  </div>
                </div>

                {/* LOGO */}
                <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                  <FaBuilding className="text-gray-500 text-xl" />
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                {job.description}
              </p>

              {/* BOTTOM ROW */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600">
                    Posted {getTimeElapsed(job.createdAt)}
                  </span>

                  {job.salaryRange?.min && job.salaryRange?.max && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      ₹ {job.salaryRange.min} - {job.salaryRange.max} LPA
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View →
                  </button>

                  {role !== "hr" && (
                    <button
                      onClick={() =>
                        navigate(`/student/apply/${job._id}`, { state: job })
                      }
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostJob;
