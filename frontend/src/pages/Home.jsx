import {
  FaUserCircle,
  FaBriefcase,
  FaGraduationCap,
  FaHandshake,
} from "react-icons/fa";
import homeImage from "../../src/assets/images/home.png";

import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const darkGradientStyle = {
    background:
      "linear-gradient(135deg, #0A0F1F 0%, #1B2540 50%, #2E1A47 100%)",
  };

  const cardGlass =
    "bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl";

  return (
    <div className="min-h-screen bg-[#0A0E19] text-gray-200">

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 blur-[150px]" />
      </div>

      {/* ================= HERO ================= */}
      <section style={darkGradientStyle} className="px-8 lg:px-20 py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Discover Your <br />
              <span className="text-purple-400">Dream Job</span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg max-w-xl">
              A smart recruitment platform where students build careers and
              companies hire faster using skill-based hiring.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 font-semibold rounded-xl">
                Find Jobs
              </button>
              <button className="border border-purple-300 text-purple-300 px-8 py-3 rounded-xl hover:bg-purple-300 hover:text-[#1A1D2E]">
                Talk to Us
              </button>
            </div>

            <p className="mt-10 text-gray-400">Trusted by top companies</p>
            <div className="flex gap-8 mt-4 opacity-80">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-6" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end">
            <div className="relative">
              <img
                src={homeImage}
                className="w-[420px] rounded-2xl shadow-2xl border border-white/10"
              />

              <div className={`${cardGlass} absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl`}>
                <span className="text-sm font-semibold text-purple-200">
                  Skill Ability Test
                </span>
              </div>

              <div className={`${cardGlass} absolute bottom-0 left-1/2 -translate-x-1/2 px-5 py-2 rounded-xl flex items-center gap-2`}>
                <FaUserCircle />
                <FaUserCircle />
                <FaUserCircle />
                <span className="text-sm text-purple-200">Applicants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="min-h-screen flex items-center px-8 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            One Platform.{" "}
            <span className="text-blue-500">Every Hiring Need.</span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            From job discovery and skill testing to interviews and hiring —
            SmartRecruit simplifies the entire recruitment journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              ["For Students", "Apply, test, track progress, and build verified profiles."],
              ["For Companies", "Screen candidates faster with data-driven hiring."],
              ["Smart Automation", "Reduce bias and manual effort using workflows."],
            ].map(([title, desc], i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="px-8 lg:px-20 py-28 bg-[#111827]">
        <h2 className="text-3xl font-bold text-center text-white">
          Our Services
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Everything you need to get hired or hire better.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">
          {[
            {
              title: "Job Search",
              desc: "Find curated opportunities matched to your skills.",
              icon: <FaBriefcase className="text-purple-400 w-10 h-10" />,
            },
            {
              title: "Skill Tests",
              desc: "Prove your abilities with real-world assessments.",
              icon: <FaGraduationCap className="text-purple-400 w-10 h-10" />,
            },
            {
              title: "HR Tools",
              desc: "Manage hiring pipelines, interviews, and decisions.",
              icon: <FaHandshake className="text-purple-400 w-10 h-10" />,
            },
          ].map((s, i) => (
            <div key={i} className={`${cardGlass} p-8 rounded-2xl text-center`}>
              <div className="flex justify-center mb-4">{s.icon}</div>
              <h3 className="text-xl text-white font-semibold">{s.title}</h3>
              <p className="text-gray-400 mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="students" className="px-8 lg:px-20 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            Built for Students & Recruiters
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Whether you are starting your career or building a team — we’ve got you covered.
          </p>
        </div>
      </section>

      {/* ================= CONTACT / CTA ================= */}
      <section
        id="contact"
        className="bg-gradient-to-r from-purple-700 to-purple-500 text-white text-center px-8 lg:px-20 py-28"
      >
        <h2 className="text-3xl font-bold">Ready to Start?</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto text-purple-100">
          Join SmartRecruit and experience modern, skill-first hiring.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/student/signup")}
            className="bg-white text-purple-700 font-semibold px-10 py-3 rounded-xl"
          >
            Join as Student
          </button>

          <button
            onClick={() => navigate("/hr/signup")}
            className="border border-white px-10 py-3 rounded-xl hover:bg-white hover:text-purple-700 font-semibold"
          >
            Join as Company
          </button>

        </div>
      </section>
    </div>
  );
};

export default Home;
