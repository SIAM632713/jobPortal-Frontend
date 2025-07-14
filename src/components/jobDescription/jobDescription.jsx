import React from 'react';
import {useGetJobPostbyIDQuery} from "@/redux/feature/jobAPI/jobAPI.js";
import {useParams} from "react-router-dom";
import Loading from "@/components/Screenloading/Loading.jsx";
import {useApplyJobsMutation} from "@/redux/feature/applicationAPI/applicationAPI.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

const JobDescription = () => {

    const {id}=useParams();
    const {user}=useSelector((state)=>state.auth)
    const {data,error,isLoading}=useGetJobPostbyIDQuery(id)
    const [applyJobs]=useApplyJobsMutation()

    const {title,location,description,requirements,salary,position,createdAt,jobType,application}=data?.data || []

    const currentUserId = user?.id || user?._id;

    const userApplied = application?.some((app) => {
        if (typeof app.applicant === "object") {
            return app.applicant._id === currentUserId;
        }
        return app.applicant === currentUserId;
    });

    const HandleapplyJobs=async(id)=>{
        try {
            await applyJobs(id).unwrap()
            toast.success("Apply job successfully.")
        }catch(err){
            console.log(err)
            toast.error("already applied")
        }
    }


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
        <div className="max-w-[1400px] mx-auto p-4 sm:p-8 bg-white rounded-xl shadow-lg mt-6 sm:mt-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{position}</span>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{jobType}</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{salary}</span>
                    </div>
                </div>

                <button
                    onClick={() => HandleapplyJobs(id)}
                    disabled={userApplied}
                    className={`px-5 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                        userApplied
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
                    }`}
                >
                    {userApplied ? "Already Applied" : "Apply Now"}
                </button>
            </div>

            {/* Job Description */}
            <div className="mt-8 border-t pt-6 space-y-4 text-sm sm:text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <p className="flex items-start">
                            <span className="font-semibold text-gray-700 min-w-[120px]">Role:</span>
                            <span className="text-gray-600">{title}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-semibold text-gray-700 min-w-[120px]">Location:</span>
                            <span className="text-gray-600">{location}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-semibold text-gray-700 min-w-[120px]">Salary:</span>
                            <span className="text-gray-600">{salary}</span>
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p className="flex items-start">
                            <span className="font-semibold text-gray-700 min-w-[120px]">Posted Date:</span>
                            <span className="text-gray-600">{new Date(createdAt).toLocaleDateString()}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-semibold text-gray-700 min-w-[120px]">Applicants:</span>
                            <span className="text-gray-600">{application?.length || 0}</span>
                        </p>
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Job Description</h3>
                        <p className="text-gray-600 leading-relaxed">{description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Requirements</h3>
                        <p className="text-gray-600 leading-relaxed">{requirements}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;