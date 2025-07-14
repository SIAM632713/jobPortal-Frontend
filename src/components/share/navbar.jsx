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
            <div className="px-4 sm:px-8 py-3 sm:py-5 flex justify-between items-center h-[60px] sm:h-[80px]">
                {/* Logo */}
                <Link to="/" className="text-xl sm:text-2xl font-bold">
                    Job<span className="text-red-600">Portal</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base">
                    {
                        user?.role === "recruiter" ? (
                            <>
                                <Link to="/dashboard/company" className="hover:underline font-medium hidden sm:block">Company</Link>
                                <Link to="/dashboard/job-list" className="hover:underline font-medium hidden sm:block">Job</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:underline font-medium hidden sm:block">Home</Link>
                                <Link to="/job" className="hover:underline font-medium hidden sm:block">Jobs</Link>
                            </>
                        )
                    }

                    {/* Avatar with Popover */}
                    {token ? (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="cursor-pointer w-7 h-7 sm:w-8 sm:h-8">
                                    <AvatarImage src={user?.profilePhoto} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 sm:w-72 p-4 sm:p-5 shadow-lg">
                                {/* Profile Info */}
                                <div className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                        <AvatarImage src={user?.profilePhoto} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="text-sm sm:text-base font-semibold">{user?.fullname}</h1>
                                        <p className="text-xs sm:text-sm text-gray-500">{user?.bio}</p>
                                    </div>
                                </div>

                                {/* Menu Options */}
                                <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <Link to="/profile" className="flex items-center gap-2 sm:gap-3 hover:text-blue-600 transition-all">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5" /> View Profile
                                    </Link>
                                    <button onClick={HandlelogOut} className="flex items-center gap-2 sm:gap-3 hover:text-red-600 transition-all">
                                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" /> Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-3 py-1 sm:px-4 sm:py-2 rounded-md border border-gray-300 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-purple-600 text-white text-sm sm:text-base font-medium hover:bg-purple-700 transition"
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