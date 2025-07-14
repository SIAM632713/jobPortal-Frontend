import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/job?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto flex items-center justify-center text-center px-4 sm:px-6 mt-8 sm:mt-10">
            <div className="max-w-3xl w-full">
                <p className="inline-block bg-red-100 text-red-600 font-semibold px-3 sm:px-4 py-1 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm">
                    No. 1 Job Hunt Website
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                    Search, Apply & <br />
                    Get Your <span className="text-purple-600">Dream Jobs</span>
                </h1>
                <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-center w-full">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="w-full max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-l-full shadow-md outline-none text-sm sm:text-base"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-r-full hover:bg-purple-700 transition"
                    >
                        <Search size={21}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;