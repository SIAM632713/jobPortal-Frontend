import React from 'react';
import {useGetApplicantUserQuery} from "@/redux/feature/applicationAPI/applicationAPI.js";
import {useSelector} from "react-redux";
import Loading from "@/components/Screenloading/Loading.jsx";

const Table = () => {
    const {user}=useSelector((state)=>state.auth)
    const {data,error,isLoading}=useGetApplicantUserQuery(user?._id)

    const jobData=data?.data || []

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
        <div className="max-w-[1400px] mx-auto mt-6 sm:mt-10 bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-lg sm:text-xl font-semibold p-4 sm:p-5 border-b border-gray-100 text-gray-800">
                Applied Jobs
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="p-3 text-xs sm:text-sm font-medium">Date</th>
                        <th className="p-3 text-xs sm:text-sm font-medium">Job Role</th>
                        <th className="p-3 text-xs sm:text-sm font-medium">Job Type</th>
                        <th className="p-3 text-xs sm:text-sm font-medium">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {jobData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-3 text-xs sm:text-sm text-gray-600">
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-xs sm:text-sm font-medium text-gray-800">
                                {item?.job?.title}
                            </td>
                            <td className="p-3 text-xs sm:text-sm text-gray-600">
                                {item?.job?.jobType}
                            </td>
                            <td className="p-3">
                                    <span className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                                        item?.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : item?.status === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {item?.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 text-xs sm:text-sm text-gray-500 text-center border-t border-gray-100">
                Showing {jobData.length} applied jobs
            </div>
        </div>
    );
};

export default Table;