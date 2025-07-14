import React, { useState } from 'react';
import JobFilter from './JobFilter';
import { Link, useSearchParams } from "react-router-dom";
import { useGetjobByFilterQuery } from "@/redux/feature/jobAPI/jobAPI.js";
import Loading from "@/components/Screenloading/Loading.jsx";
import ReactPaginate from "react-paginate";
import { AiOutlineClose } from "react-icons/ai"; // Close icon

const Job = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const [filterState, setfilterState] = useState({
        title: 'all',
        location: 'all',
        salaryRange: ''
    });

    const { title, location, salaryRange } = filterState;
    const [minSalary, maxSalary] = salaryRange.split('-').map(Number);

    const { data, isLoading, error } = useGetjobByFilterQuery({
        keyword,
        title: title !== "all" ? title : '',
        location: location !== "all" ? location : "",
        minSalary: isNaN(minSalary) ? '' : minSalary,
        maxSalary: isNaN(maxSalary) ? "" : maxSalary
    });

    const jobData = data?.data || [];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = jobData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(jobData.length / itemsPerPage);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date();
        const timedifferent = currentTime - createdAt
        return Math.floor(timedifferent / (1000 * 24 * 60 * 60))
    }

    const [showFilter, setShowFilter] = useState(false);

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Filter Toggle Button (Mobile Only) */}
            <div className="lg:hidden flex justify-end mb-4">
                <button
                    onClick={() => setShowFilter(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md"
                >
                    Filter
                </button>
            </div>

            {/* Filter Drawer (Mobile Only) */}
            {showFilter && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setShowFilter(false)}
                    />

                    {/* Sidebar Drawer */}
                    <div className="relative w-64 bg-white shadow h-full p-4 z-50 overflow-y-auto">
                        <button
                            onClick={() => setShowFilter(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                        >
                            <AiOutlineClose />
                        </button>
                        <div className="max-h-[calc(100vh-40px)] overflow-y-auto pr-2 mt-6">
                            <JobFilter filterState={filterState} setfilterState={setfilterState} />
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-[1400px] mx-auto flex gap-6">
                {/* Sidebar for Large Screens */}
                <div className="hidden lg:block max-h-[90vh] overflow-y-auto">
                    <JobFilter filterState={filterState} setfilterState={setfilterState} />
                </div>

                <div className="flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-4 w-full"
                            >
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-gray-500">
                                        {daysAgoFunction(item?.createdAt) === 0 ? "Today" : `${daysAgoFunction(item?.createdAt)} day ago`}
                                    </p>
                                    <button>
                                        <svg
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <h3 className="font-bold text-lg">{item?.company}</h3>
                                    <p className="text-sm text-gray-500">{item?.location}</p>
                                    <h4 className="mt-1 font-semibold text-md">{item?.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {item?.description}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {item?.position} Positions
                                    </span>
                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                        {item?.jobType}
                                    </span>
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        {item?.salary}
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Link to={`/jobDescription/${item?._id}`}
                                          className="px-4 py-1 border rounded hover:bg-gray-100 text-sm">
                                        Details
                                    </Link>
                                    <button
                                        className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                                        Save For Later
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="Prev"
                            containerClassName="flex gap-2 text-sm"
                            pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                            activeClassName="bg-purple-600 text-white"
                            previousClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                            previousLinkClassName="cursor-pointer"
                            nextClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                            nextLinkClassName="cursor-pointer"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            disabledLinkClassName="cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Job;
