import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";
import {useEditJobByIdMutation, useGetJobPostQuery} from "@/redux/feature/jobAPI/jobAPI.js";

const UpdateJobpost = () => {
    const {id} = useParams();
    const [editJobById,{isLoading}]=useEditJobByIdMutation(id)
    const {data}=useGetJobPostQuery()
    const [Upload,setUpload]=useState()

    const [inputForm, setinputForm] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location:"",
        jobType:"",
        position:""
    });

    useEffect(()=>{
        if(data?.data){
            const jobData=data?.data.find(item=>item._id===id)
            if(jobData){
                setinputForm({
                    title:jobData.title || "",
                    description:jobData.description || "",
                    requirements:jobData.requirements || "",
                    salary:jobData.salary || "",
                    location:jobData.location || "",
                    jobType:jobData.jobType || "",
                    position:jobData.position || ""
                })
            }
        }
    },[])

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setinputForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            const newData={
                title:inputForm.title,
                description:inputForm.description,
                requirements:inputForm.requirements,
                salary:inputForm.salary,
                location:inputForm.location,
                jobType:inputForm.jobType ,
                position:inputForm.position
            }

            await editJobById({id,updatedata:newData}).unwrap()
            alert("Company Updated Successfully")
            setinputForm({
                title: "",
                description: "",
                requirements: "",
                salary: "",
                location:"",
                jobType:"",
                position:""
            })
        }catch(err) {
            console.log(err);
        }finally {
            setUpload(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-[1000px] rounded-xl shadow-lg p-6 md:p-8 bg-white">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link to="/dashboard/job-post" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ArrowLeft size={20} className="text-gray-700"/>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Update Job Post</h2>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                                value={inputForm.title}
                                onChange={handleOnChange}
                                name="title"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter job title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter job description"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                            <input
                                value={inputForm.requirements}
                                onChange={handleOnChange}
                                name="requirements"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter requirements"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                            <input
                                value={inputForm.salary}
                                onChange={handleOnChange}
                                name="salary"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter salary range"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                value={inputForm.location}
                                onChange={handleOnChange}
                                name="location"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter location"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                            <input
                                value={inputForm.jobType}
                                onChange={handleOnChange}
                                name="jobType"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter job type"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">No of Position</label>
                            <input
                                value={inputForm.position}
                                onChange={handleOnChange}
                                name="position"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter number of positions"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isLoading || Upload}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading || Upload ? <ButtonLoader/> : "Update Job Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobpost;