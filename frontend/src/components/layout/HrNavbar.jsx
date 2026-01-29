import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMoreVertical, FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const HrNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`relative text-sm font-medium transition
        ${
          location.pathname === to
            ? "text-blue-600"
            : "text-gray-700 hover:text-blue-600"
        }
      `}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300
        ${
          location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">

        {/* LEFT (Desktop Nav) */}
        <div className="hidden md:flex items-center space-x-8 group">
          {navLink("/jobs", "Home")}
          {navLink("/hr/dashboard", "Dashboard")}
          {navLink("/hr/create", "Create Jobs")}
        </div>

        {/* LOGO */}
        <div
          onClick={() => navigate("/hr/dashboard")}
          className="flex items-center gap-3 cursor-pointer select-none hover:scale-[1.02] transition"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 
                          flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold tracking-wide">SR</span>
          </div>

          <div className="leading-none">
            <span className="text-lg font-bold text-gray-900">
              Smart<span className="text-blue-600">Recruit</span>
            </span>
            <p className="text-xs text-gray-500">Hire smarter</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FiMenu className="text-xl" />
          </button>

          {/* Profile */}
          <Link
            to="/hr/profile"
            className="hidden md:flex items-center gap-1.5 bg-blue-600 text-white 
                       px-4 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <FaUserCircle className="text-lg" />
            Profile
          </Link>

          {/* More Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FiMoreVertical className="text-xl text-gray-700" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 
                            shadow-xl rounded-xl w-44 py-2 animate-fadeIn">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm 
                           text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          {navLink("/jobs", "Home")}
          {navLink("/hr/dashboard", "Dashboard")}
          {navLink("/hr/create", "Create Jobs")}
          <Link
            to="/hr/profile"
            className="block text-sm text-blue-600 font-medium"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HrNavbar;
