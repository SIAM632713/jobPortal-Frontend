import React, {useState} from 'react';
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Screenloading/Loading.jsx";

const Latestjob = ({jobList,isLoading,error}) => {

    const [visibleJob, setVisibleJob] = useState(10);

    const handleClick = () => {
        setVisibleJob(prev => prev + 5);
    };

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading/>
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                <span className="text-purple-700 font-bold">Latest & Top</span> Job Openings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobList.slice(0,visibleJob).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-100"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{item.company}</h3>
                                <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                New
                            </span>
                        </div>
                        <h4 className="mt-3 text-lg font-bold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <Badge variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">{item.position}</Badge>
                            <Badge variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">{item.jobType}</Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">{item.salary}</Badge>
                        </div>
                    </div>
                ))}
            </div>
            {visibleJob < jobList.length && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleClick}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Load More Jobs
                    </button>
                </div>
            )}
        </div>
    );
};

export default Latestjob;