import { Link } from "react-router-dom";
import { Link as LinkS } from "react-scroll";   // Added for smooth scroll
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const primaryColor = "purple-600";
  const hoverBgColor = "purple-50";
  const hoverTextColor = "purple-700";

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
      
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-2">
        <div className={`w-6 h-6 rounded-full bg-${primaryColor} flex items-center justify-center`}>
          <span className="text-white text-sm font-bold">W</span>
        </div>
        <span className="text-xl font-bold text-gray-800">WorkFinder</span> 
      </div>

      {/* Middle Menu */}
      <ul className="hidden md:flex space-x-8 text-gray-600">

        {/* HOME → router link */}
        <li>
          <Link to="/" className={`hover:text-${primaryColor}`}>
            Home
          </Link>
        </li>

        {/* ABOUT → Scroll to section */}
        <li>
          <LinkS 
            to="about" 
            smooth={true} 
            duration={600}
            offset={-70}
            className={`cursor-pointer hover:text-${primaryColor}`}
          >
            About
          </LinkS>
        </li>

        {/* SERVICES */}
        <li>
          <LinkS 
            to="services" 
            smooth={true} 
            duration={600}
            offset={-70}
            className={`cursor-pointer hover:text-${primaryColor}`}
          >
            Services
          </LinkS>
        </li>

        {/* CATEGORIES → Scroll to students section */}
        <li>
          <LinkS 
            to="students"
            smooth={true}
            duration={600}
            offset={-70}
            className={`cursor-pointer hover:text-${primaryColor}`}
          >
            Categories
          </LinkS>
        </li>

        {/* CONTACT */}
        <li>
          <LinkS 
            to="contact" 
            smooth={true}
            duration={600}
            offset={-70}
            className={`cursor-pointer hover:text-${primaryColor}`}
          >
            Contact
          </LinkS>
        </li>
      </ul>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        
        <Link
          to="/login"
          className={`hidden md:block border border-${primaryColor} text-${primaryColor} px-4 py-2 rounded-lg hover:bg-${hoverBgColor} transition`}
        >
          Login
        </Link>
        
        <Link
          to="/signup"
          className={`hidden md:block bg-${primaryColor} text-white px-4 py-2 rounded-lg hover:bg-${hoverTextColor} transition`}
        >
          Signup
        </Link>

        {/* Mobile Menu */}
        <button className="md:hidden text-gray-600 hover:text-purple-600 p-1">
          <HiMenu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
