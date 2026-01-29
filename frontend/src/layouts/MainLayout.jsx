import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/MainNavbar";
import Footer from "../components/layout/Footer";


// Main layout component
const MainLayout = () =>{
  return (
    <div>
      <Navbar /> 
      <main className="min-h-screen">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}


export default MainLayout;