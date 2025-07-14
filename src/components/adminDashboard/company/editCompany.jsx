import React, {useEffect, useState} from 'react';
import {ArrowLeft, X} from "lucide-react";
import {useGetAllcompanyQuery, useUpdateCompanyMutation} from "@/redux/feature/companyAPI/companyAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Link, useParams} from "react-router-dom";
import ButtonLoader from "@/components/buttonLoader/buttonLoader.jsx";

const EditCompany = () => {

    const {id}=useParams();
    const [updateCompany,{isLoading}]=useUpdateCompanyMutation(id)
    const {data}=useGetAllcompanyQuery()
    const [Upload,setUpload]=useState()

    const [inputForm, setinputForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        imageFile:""
    });

    useEffect(() => {
        if(data?.data){
            const company=data?.data.find(item=>item._id===id)
            if(company){
                setinputForm({
                    name : company.name || "",
                    description:company.description || "",
                    website :company.website || "",
                    location : company.location || "",
                    imageFile:company.logo || ""
                })
            }
        }
    },[data,id])

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setUpload(true);
        try {
            let imageUrl = "";

            if (inputForm.imageFile) {
                const formData = new FormData();
                formData.append("image", inputForm.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/api/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }

            const newData={
                name:inputForm.name,
                description:inputForm.description,
                website:inputForm.website,
                location:inputForm.location,
                logo:imageUrl,
            }

            await updateCompany({id,newData:newData}).unwrap()
            alert("Company Updated Successfully")
            setinputForm({
                name: "",
                description: "",
                website: "",
                location: "",
                imageFile:""
            })
        }catch(err) {
            console.log(err);
        }finally {
            setUpload(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-[1000px] rounded-xl shadow-md bg-white p-6 sm:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link to="/dashboard/company" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ArrowLeft size={20} className="text-gray-600"/>
                    </Link>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Update Company</h2>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Company Name</label>
                            <input
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name="name"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="Enter company name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Description</label>
                            <input
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="Brief company description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Website</label>
                            <input
                                value={inputForm.website}
                                onChange={handleOnChange}
                                name="website"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Location</label>
                            <input
                                value={inputForm.location}
                                onChange={handleOnChange}
                                name="location"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                placeholder="Company location"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Company Logo</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <input
                                    onChange={handleOnChange}
                                    name="imageFile"
                                    type="file"
                                    className="w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-gray-100 file:text-gray-700
                                        hover:file:bg-gray-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={isLoading || Upload}
                            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base font-medium"
                        >
                            {isLoading || Upload ? <ButtonLoader/> : "Update Company"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCompany;