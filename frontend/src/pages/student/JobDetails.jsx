import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaBuilding,
  FaMoneyBillWave,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [role, setRole] = useState("");

  const parseJwt = (token) => {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/job/${id}`).then((res) => {
      setJob(res.data);
    });

    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    setRole(decoded?.role || "");
  }, [id]);

  if (!job)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg">Loading job details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT MAIN CONTENT */}
        <div className="md:col-span-2 space-y-8">

          {/* HEADER CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="text-gray-600 mt-1">{job.company}</p>

                {/* META */}
                <div className="flex flex-wrap gap-5 text-sm text-gray-500 mt-4">
                  <span className="flex items-center gap-1">
                    <FaBriefcase /> {job.experience || "Fresher"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {job.jobType || "Full Time"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {job.location || "Remote"}
                  </span>
                </div>
              </div>

              <div className="w-14 h-14 border rounded-xl flex items-center justify-center">
                <FaBuilding className="text-2xl text-gray-500" />
              </div>
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          {job.requirements && (
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-3">Requirements</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          )}

          {/* RESPONSIBILITIES */}
          {job.responsibilities && (
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-3">
                Responsibilities
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* APPLY CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-28">
            <h3 className="text-lg font-semibold mb-4">
              Job Overview
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium">
                  {job.experience || "Fresher"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Job Type</span>
                <span className="font-medium">
                  {job.jobType || "Full Time"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-medium">
                  {job.location || "Remote"}
                </span>
              </div>

              {job.salaryRange?.min && job.salaryRange?.max && (
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <FaMoneyBillWave /> Salary
                  </span>
                  <span className="font-semibold text-green-600">
                    ₹ {job.salaryRange.min} - {job.salaryRange.max} LPA
                  </span>
                </div>
              )}
            </div>

            {/* APPLY BUTTON */}
            {role !== "hr" && (
              <button
                onClick={() =>
                  navigate(`/student/apply/${job._id}`, { state: job })
                }
                className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-xl 
                           font-semibold hover:bg-blue-700 transition"
              >
                Apply Now
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;
