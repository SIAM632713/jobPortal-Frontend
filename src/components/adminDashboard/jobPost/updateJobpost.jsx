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
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-[1000px] rounded-2xl shadow-lg p-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <Link to="/dashboard/job-post" className="p-2 rounded hover:bg-gray-100">
                        <ArrowLeft size={20}/>
                    </Link>
                    <h2 className="text-xl font-semibold">Update Job</h2>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Title</label>
                            <input
                                value={inputForm.title}
                                onChange={handleOnChange}
                                name="title"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Requirements</label>
                            <input
                                value={inputForm.requirements}
                                onChange={handleOnChange}
                                name="requirements"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="requirement"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Salary</label>
                            <input
                                value={inputForm.salary}
                                onChange={handleOnChange}
                                name="salary"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="salary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                value={inputForm.location}
                                onChange={handleOnChange}
                                name="location"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="Location"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Type</label>
                            <input
                                value={inputForm.jobType}
                                onChange={handleOnChange}
                                name="jobType"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="type"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">No of Position</label>
                            <input
                                value={inputForm.position}
                                onChange={handleOnChange}
                                name="position"
                                type="text"
                                className="w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-black"
                                placeholder="position"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded hover:bg-opacity-90 transition"
                        >
                            {isLoading || Upload ? <ButtonLoader/> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobpost;