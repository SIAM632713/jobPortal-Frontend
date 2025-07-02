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
        <div className="max-w-[1400px] mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-4 border-b">Applied Jobs</h2>
            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600">
                <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Job Role</th>
                    <th className="p-3">Job Type</th>
                    <th className="p-3">Status</th>
                </tr>
                </thead>
                <tbody>
                {jobData.map((item, index) => (
                    <tr key={index} className="border-t">
                        <td className="p-3">{new Date(item?.createdAt).toLocaleDateString()}</td>
                        <td className="p-3">{item?.job?.title}</td>
                        <td className="p-3">{item?.job?.jobType}</td>
                        <td className="p-3">
                                <span className="px-3 py-1 text-sm font-semibold text-white bg-black rounded-full">
                                    {item?.status}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="p-4 text-sm text-gray-500 text-center">
                A list of your applied jobs
            </div>
        </div>
    );
};

export default Table;
