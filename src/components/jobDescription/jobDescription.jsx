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
        <div className="max-w-[1400px] mx-auto p-6 bg-white rounded shadow mt-10">
            {/* Header */}
            <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">Frontend Developer</h1>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{position}</span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{jobType}</span>
                        <span
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">{salary}</span>
                    </div>
                </div>

                <button
                    onClick={() => HandleapplyJobs(id)}
                    disabled={userApplied}
                    className={`px-4 py-2 rounded font-medium ${
                        userApplied
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-purple-600 text-white cursor-pointer"
                    }`}
                >
                    {userApplied ? "Already Applied" : "Apply Now"}
                </button>
            </div>

            {/* Job Description */}
            <div className="mt-6 border-t pt-6 space-y-3 text-sm sm:text-base">
                <p><span className="font-semibold">Role:</span> {title}</p>
                <p><span className="font-semibold">Location:</span> {location}</p>
                <p><span className="font-semibold">Description:</span>{description}</p>
                <p><span className="font-semibold">Experience:</span>{requirements}</p>
                <p><span className="font-semibold">Salary:</span>{salary}</p>
                <p><span className="font-semibold">Total Applicant:</span> {application?.length || 0}</p>
                <p><span className="font-semibold">Posted Date:</span>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default JobDescription;
