import { Outlet } from "react-router-dom";
import HrNavbar from "../components/layout/HrNavbar";
import StudentNavbar from "../components/layout/StudentNavbar";
import Footer from "../components/layout/Footer";


// Public layout component
const PublicLayout = () => {
  const role = localStorage.getItem("role");

  return (
    <div>
      {role === "hr" ? <HrNavbar /> : <StudentNavbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}


export default PublicLayout;