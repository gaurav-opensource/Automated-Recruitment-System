import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import BASE_URL from "../../apiConfig";
import Loader from "../../components/common/Loader";
import uploadToCloudinary from "../../services/cloudinary.service";

const ApplyPage = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const job = location.state;

  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.resume) {
      setError("Please upload your resume (PDF).");
      return;
    }

    try {
      setLoading(true);

      // Upload resume to Cloudinary
      const resumeLink = await uploadToCloudinary(form.resume, "raw");

      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/job/apply/${jobId}`,
        {
          name: form.name,
          email: form.email,
          resumeLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application submitted successfully 🎉");
      navigate("/jobs");
    } catch (err) {
      console.error("Apply Error:", err);
      setError(err.response?.data?.message || "Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Apply for {job?.title}
        </h1>

        {/* Job Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
          <p><span className="font-semibold">Company:</span> {job?.company}</p>
          <p><span className="font-semibold">Location:</span> {job?.location}</p>
          <p><span className="font-semibold">Job Type:</span> {job?.employmentType}</p>
          <p><span className="font-semibold">Salary:</span> {job.salaryRange.min} - {job.salaryRange.max} </p>
          <p>
            <span className="font-semibold">Deadline:</span>{" "}
            {job?.deadline
              ? new Date(job.deadline).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Upload Resume (PDF only)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full border border-dashed border-gray-400 rounded-lg p-3 bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 font-medium text-sm">{error}</p>
          )}

          {/* Submit */}
          <div className="pt-4">
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
