import React from 'react';
import {Link, useSearchParams} from "react-router-dom";
import { useListByKeywordServiceQuery } from "@/redux/feature/jobAPI/jobAPI";
import Loading from "@/components/Screenloading/Loading"; // optional if you want loading spinner

const Browse = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const { data, isLoading, error } = useListByKeywordServiceQuery(keyword || "");

    const jobs = data?.data || [];

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
        <div className="bg-white py-10 px-6">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-lg font-semibold mb-6">Search Results ({jobs.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div key={index} className="bg-white rounded-xl shadow p-4">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-gray-500">2 days ago</p>
                                <button className="text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2">
                                <h3 className="font-bold text-lg">{job.company}</h3>
                                <p className="text-sm text-gray-500">{job.location}</p>
                                <h4 className="mt-1 font-semibold text-md">{job.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{job.description?.slice(0, 100)}...</p>
                            </div>
                            <div className="flex gap-2 mt-3 flex-wrap text-xs">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.position}</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">{job.jobType}</span>
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">${job.salary}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Link to={`/jobDescription/${job?._id}`}>
                                    <button className="px-4 py-1 border rounded text-sm hover:bg-gray-100">Details
                                    </button>
                                </Link>
                                <button
                                    className="px-4 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                                    Save For Later
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
