import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {MoreHorizontal} from "lucide-react";
import {
    useDeleteJobByIdMutation,
    useGetJobPostQuery,
    useListByKeywordServiceQuery
} from "@/redux/feature/jobAPI/jobAPI.js";
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import Loading from "@/components/Screenloading/Loading.jsx";
import ReactPaginate from "react-paginate";

const JobList = () => {

    const {data,error,isLoading,refetch}=useGetJobPostQuery()
    const [deleteJobById]=useDeleteJobByIdMutation()

    const [search,setsearch]=useState("")
    const {data:searchData}=useListByKeywordServiceQuery(search,{
        skip:search===""
    })

    const jobList=search ? (Array.isArray(searchData?.data) ? searchData?.data : []) : (Array.isArray(data?.data) ? data?.data : [])

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = jobList.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(jobList.length / itemsPerPage);


    const HandledeleteJob=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteJobById(id).unwrap()
                await showSuccess("job deleted successfully.")
                refetch()
            }catch(error){
                showError("Job deleted failed")
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6 sm:mt-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Filter by job title"
                        value={search}
                        onChange={e => setsearch(e.target.value)}
                        className="w-full sm:w-64 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <Link to="/dashboard/job-post"
                          className="w-full sm:w-auto bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition text-center">
                        New Job Post
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Company</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Role</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Posted</th>
                            <th className="px-4 py-3 font-medium text-gray-700 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {
                            currentItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-800">{item?.companyID?.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{item?.title}</td>
                                    <td className="px-4 py-3 text-gray-500">{new Date(item?.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 rounded hover:bg-gray-100">
                                                    <MoreHorizontal className="h-4 w-4 text-gray-600"/>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="min-w-[120px]">
                                                <Link to={`/dashboard/applicant/${item?._id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">Applicants</DropdownMenuItem>
                                                </Link>
                                                <Link to={`/dashboard/update-job-post/${item?._id}`}>
                                                    <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    onClick={() => HandledeleteJob(item?._id)}
                                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                                >
                                                    Delete
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
                    Showing {currentItems.length} of {jobList.length} jobs
                </p>

                <div className="flex justify-center mt-6 sm:mt-8">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="Prev"
                        containerClassName="flex gap-2 text-sm items-center"
                        pageClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                        activeClassName="bg-gray-800 text-white"
                        previousClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                        previousLinkClassName="cursor-pointer"
                        nextClassName="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                        nextLinkClassName="cursor-pointer"
                        disabledClassName="opacity-50 cursor-not-allowed"
                        disabledLinkClassName="cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    );
};

export default JobList;