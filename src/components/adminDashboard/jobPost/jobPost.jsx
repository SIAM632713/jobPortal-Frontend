import React, {useState} from 'react';
import {useGetAllcompanyQuery} from "@/redux/feature/companyAPI/companyAPI.js";
import {useJobPostsMutation} from "@/redux/feature/jobAPI/jobAPI.js";
import {useSelector} from "react-redux";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";

const JobPost = () => {

    const {user}=useSelector((state) => state.auth);
    const [jobPosts,{isLoading}]=useJobPostsMutation()
    const {data}=useGetAllcompanyQuery()

    const compnayData=data?.data || []

    const [Upload,setUpload]=useState()

    const [inputForm, setinputForm] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location:"",
        jobType:"",
        position:"",
        companyID:"",
        createdBy:""
    });

    const handleOnChange = (e) => {
        const { name, value} = e.target;
        setinputForm({
            ...inputForm,
            [name]:value
        })
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            if (!inputForm.title || !inputForm.description || !inputForm.companyID) {
                alert("Please fill all required fields");
                return;
            }

            const newJob={
                title:inputForm.title,
                description:inputForm.description,
                requirements:inputForm.requirements,
                salary:inputForm.salary,
                location:inputForm.location,
                jobType:inputForm.jobType,
                position:inputForm.position,
                companyID:inputForm.companyID,
                createdBy:user?._id
            }

            await jobPosts(newJob).unwrap()
            alert("Company Created Successfully")
            setinputForm({
                title: "",
                description: "",
                requirements: "",
                salary: "",
                location:"",
                jobType:"",
                position:"",
                companyID:"",
                createdBy:""
            })
        }catch(err) {
            console.log(err);
        }finally {
            setUpload(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Create New Job Post</h1>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Job Title*</label>
                            <input
                                value={inputForm.title}
                                onChange={handleOnChange}
                                name="title"
                                type="text"
                                placeholder="Software Engineer"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Job Description*</label>
                            <input
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                placeholder="Job responsibilities and details"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Requirements</label>
                            <input
                                value={inputForm.requirements}
                                onChange={handleOnChange}
                                name="requirements"
                                type="text"
                                placeholder="Skills and qualifications"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Salary</label>
                            <input
                                value={inputForm.salary}
                                onChange={handleOnChange}
                                name="salary"
                                type="text"
                                placeholder="$70,000 - $90,000"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Location</label>
                            <input
                                value={inputForm.location}
                                onChange={handleOnChange}
                                name="location"
                                type="text"
                                placeholder="City, Country"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Job Type</label>
                            <input
                                value={inputForm.jobType}
                                onChange={handleOnChange}
                                name="jobType"
                                type="text"
                                placeholder="Full-time, Remote, etc."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Positions Available</label>
                            <input
                                value={inputForm.position}
                                onChange={handleOnChange}
                                name="position"
                                type="number"
                                placeholder="Number of openings"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Company*</label>
                        <select
                            name="companyID"
                            value={inputForm.companyID}
                            onChange={handleOnChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                            <option value="">Select a Company</option>
                            {
                                compnayData.map(company => (
                                    <option key={company?._id} value={company?._id}>
                                        {company.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isLoading || Upload}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base font-medium mt-4"
                    >
                        {isLoading || Upload ? <ButtonLoader/> : "Post Job"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobPost;