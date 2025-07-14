import React from 'react';
import { useParams} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {MoreHorizontal} from "lucide-react";
import {useGetApplicantAdminUserQuery, useUpdateStatusMutation} from "@/redux/feature/applicationAPI/applicationAPI.js";
import Loading from "@/components/Screenloading/Loading.jsx";

const AllApplicant = () => {
    const {id}=useParams()
    const {data,error,isLoading,refetch}=useGetApplicantAdminUserQuery(id)
    const [updateStatus]=useUpdateStatusMutation()

    const updateStatusHandeler=async(applicationId,newStatus)=>{
        try {
            await updateStatus({id:applicationId,status:newStatus})
            alert("Status Update successfully")
            refetch()
        }catch(err){
            console.log(err)
        }
    }

    const ApplicantData=data?.data || []

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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6 sm:mt-10">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Applicants: {ApplicantData.length || 0}</h1>
                <div className="overflow-x-auto mt-4 sm:mt-5">
                    <table className="min-w-full text-sm">
                        <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Full Name</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Email</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Contact</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Resume</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Date</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {
                            ApplicantData.map((item,index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-800">{item?.applicant?.fullname}</td>
                                    <td className="px-4 py-3 text-gray-600">{item?.applicant?.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{item?.applicant?.phone}</td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {item?.applicant?.resume ? (
                                            <a href={item.applicant.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                View
                                            </a>
                                        ) : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 rounded hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="min-w-[120px]">
                                                <DropdownMenuItem
                                                    onClick={()=>updateStatusHandeler(item?._id,"pending")}
                                                    className="cursor-pointer"
                                                >
                                                    Pending
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={()=>updateStatusHandeler(item?._id,"accepted")}
                                                    className="cursor-pointer text-green-600 focus:text-green-600"
                                                >
                                                    Accepted
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={()=>updateStatusHandeler(item?._id,"rejected")}
                                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                                >
                                                    Rejected
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 py-2">
                    Showing {ApplicantData.length} applicants
                </p>
            </div>
        </div>
    );
};

export default AllApplicant;