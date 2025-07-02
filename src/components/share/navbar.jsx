import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {getToken, removeToken} from "@/utilitis/sessionHelper.js";
import {useUserLogoutMutation} from "@/redux/feature/authAPI/authAPI.js";
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {
    const token = getToken();
    const {user}=useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userLogout]=useUserLogoutMutation()


    const HandlelogOut = async () => {
      try {
          await userLogout().unwrap()
          removeToken()
          dispatch(userLogout())
          navigate("/login")
      }catch(err){
          console.log(err)
      }
    }

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="px-8 py-5 flex justify-between items-center h-[80px]">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    Job<span className="text-red-600">Portal</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8 text-base">
                    {
                        user?.role === "recruiter" ? (
                            <>
                                <Link to="/dashboard/company" className="hover:underline font-medium">Company</Link>
                                <Link to="/dashboard/job-post" className="hover:underline font-medium">Job</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:underline font-medium">Home</Link>
                                <Link to="/job" className="hover:underline font-medium">Jobs</Link>
                                <Link to="/browse" className="hover:underline font-medium">Browse</Link>
                            </>
                        )
                    }

                    {/* Avatar with Popover */}
                    {token ? (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="cursor-pointer w-8 h-8">
                                    <AvatarImage src={user?.profilePhoto} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-5 shadow-lg">
                                {/* Profile Info */}
                                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={user?.profilePhoto} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="text-base font-semibold">{user?.fullname}</h1>
                                        <p className="text-sm text-gray-500">{user?.bio}</p>
                                    </div>
                                </div>

                                {/* Menu Options */}
                                <div className="flex flex-col gap-3 text-sm">
                                    <Link to="/profile" className="flex items-center gap-3 hover:text-blue-600 transition-all">
                                        <User className="w-5 h-5" /> View Profile
                                    </Link>
                                    <button onClick={HandlelogOut} className="flex items-center gap-3 hover:text-red-600 transition-all">
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md border border-gray-300 text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-md bg-purple-600 text-white text-base font-medium hover:bg-purple-700 transition"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
