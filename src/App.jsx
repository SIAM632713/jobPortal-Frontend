import Navbar from "@/components/share/navbar.jsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Footer from "@/components/share/footer.jsx";

function App() {
    return (
        <>
        <Navbar/>
            <Toaster position="top-center"/>
            <div className="min-h-screen">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default App