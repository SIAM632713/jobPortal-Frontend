import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/browse?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto flex items-center justify-center text-center px-4 mt-10">
            <div className="max-w-3xl">
                <p className="inline-block bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-full mb-4 text-sm">
                    No. 1 Job Hunt Website
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Search, Apply & <br />
                    Get Your <span className="text-purple-600">Dream Jobs</span>
                </h1>
                <p className="text-gray-500 mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-center">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="w-full max-w-md px-4 py-3 rounded-l-full shadow-md outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-purple-600 text-white px-4 py-3 rounded-r-full hover:bg-purple-700 transition"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

