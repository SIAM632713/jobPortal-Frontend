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
        <div className="max-w-[1400px] mx-auto px-4 mt-15">
            <h2 className="text-2xl font-bold mb-8">
                <span className="text-purple-700 font-bold">Latest & Top</span> Job Openings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobList.slice(0,visibleJob).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold">{item.company}</h3>
                        <p className="text-sm text-gray-600">{item.location}</p>
                        <h4 className="mt-2 text-md font-bold">{item.title}</h4>
                        <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <Badge variant="outline" className="text-blue-600 border-blue-600">{item.position}</Badge>
                            <Badge variant="outline" className="text-red-600 border-red-600">{item.jobType}</Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-600">{item.salary}</Badge>
                        </div>
                    </div>
                ))}
            </div>
            {visibleJob < jobList.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleClick}
                        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
                    >
                        Read More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Latestjob;
