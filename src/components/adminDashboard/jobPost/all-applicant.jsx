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
        <div className="max-w-[1440px] mx-auto">
            <div className="p-6 bg-white rounded-lg shadow mt-10">
                <h1 className="text-xl font-bold">Applicants : {ApplicantData.length || 0}</h1>
                <div className="overflow-x-auto mt-5">
                    <table className="min-w-full text-sm text-left">
                        <thead className="border-b">
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700">Full Name</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Email</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Contact</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Resume</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Date</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ApplicantData.map((item,index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-3">{item?.applicant?.fullname}</td>
                                    <td className="px-4 py-3">{item?.applicant?.email}</td>
                                    <td className="px-4 py-3">{item?.applicant?.phone}</td>
                                    <td className="px-4 py-3">{item?.applicant?.resume}</td>
                                    <td className="px-4 py-3">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 rounded hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={()=>updateStatusHandeler(item?._id,"pending")}>pending</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>updateStatusHandeler(item?._id,"accepted")}>accepted</DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>updateStatusHandeler(item?._id,"rejected")}>rejected</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                    A list of your recent registered companies
                </p>
            </div>
        </div>
    );
};

export default AllApplicant;