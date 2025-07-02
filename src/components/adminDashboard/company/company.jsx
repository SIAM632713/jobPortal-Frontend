import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import {Link} from "react-router-dom";
import {
    useDeleteCompanyMutation,
    useGetAllcompanyQuery,
    useGetCompanyByKeywordQuery
} from "@/redux/feature/companyAPI/companyAPI.js";
import Loading from "@/components/Screenloading/Loading.jsx";
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";

const Company = () => {

    const [Search,setSearch]=useState("");
    const {data:searchedData,isLoading:isSearching}=useGetCompanyByKeywordQuery(Search,{
        skip:Search===""
    })

    const {data,error,isLoading,refetch}=useGetAllcompanyQuery()
    const [deleteCompany]=useDeleteCompanyMutation()

    const companyData=Search ? (searchedData?.data || []) : (data?.data || [])

    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteCompany(id).unwrap()
                await showSuccess("Conpany deleted successfully.")
                refetch()
            }catch (e){
            console.error(e)
                showError("Failed to delete company.")
            }
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
        <div className="max-w-[1440px] mx-auto">
            <div className="p-6 bg-white rounded-lg shadow mt-10">
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={Search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-64 text-sm"
                    />
                    <Link to="/dashboard/creat-company"
                        className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                        New Company
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="border-b">
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700">Logo</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Name</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Date</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            companyData.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-3">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage
                                                src={item?.logo}/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </td>
                                    <td className="px-4 py-3">{item?.name}</td>
                                    <td className="px-4 py-3">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 rounded hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                               <Link to={`/dashboard/update-company/${item?._id}`}> <DropdownMenuItem>Edit</DropdownMenuItem></Link>
                                                <DropdownMenuItem onClick={()=>HandleonDelete(item?._id)}>Delete</DropdownMenuItem>
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

export default Company;
