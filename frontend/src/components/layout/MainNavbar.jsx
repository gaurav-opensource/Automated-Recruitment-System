import { Link } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import { HiMenu } from "react-icons/hi";

const MainNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">

      {/* LOGO */}
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 
                        flex items-center justify-center shadow-md">
          <span className="text-white text-lg font-bold">SR</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold text-gray-900">
            Smart<span className="text-blue-600">Recruit</span>
          </span>
          <span className="text-xs text-gray-500">Hire smarter</span>
        </div>
      </div>

      {/* MENU */}
      <ul className="hidden md:flex space-x-8 text-gray-600">

        <li>
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
        </li>

        <li>
          <LinkS to="about" smooth duration={600} offset={-80}
            className="cursor-pointer hover:text-purple-600">
            About
          </LinkS>
        </li>

        <li>
          <LinkS to="services" smooth duration={600} offset={-80}
            className="cursor-pointer hover:text-purple-600">
            Services
          </LinkS>
        </li>

        <li>
          <LinkS to="students" smooth duration={600} offset={-80}
            className="cursor-pointer hover:text-purple-600">
            Categories
          </LinkS>
        </li>

        <li>
          <LinkS to="contact" smooth duration={600} offset={-80}
            className="cursor-pointer hover:text-purple-600">
            Contact
          </LinkS>
        </li>
      </ul>

      {/* ACTION BUTTONS */}
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="hidden md:block border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="hidden md:block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Signup
        </Link>

        <button className="md:hidden text-gray-600 hover:text-purple-600 p-1">
          <HiMenu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}


export default MainNavbar;