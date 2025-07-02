import { Outlet } from "react-router-dom";
import Navbar from "@/components/share/navbar.jsx";
import Footer from "@/components/share/footer.jsx";

const DashboardLayout = () => {
    return (
        <div>
            {/* Add sidebar, header, etc. here */}
            <Navbar/>
           <div className="min-h-screen">
               <Outlet />
           </div>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;